const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => connection.end());

describe("/api", () => {
  test("GET - status:200 - returns JSON with available endpoints ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/categories", () => {
  test("GET - status:200 - return an array of category objects with slug and description properties ", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        expect(response.body.category.length).toBe(4);
        expect(typeof response.body).toEqual("object");
        const categories = response.body.category;
        categories.forEach((category) => {
          expect(categories).hasOwnProperty("slug");
          expect(categories).hasOwnProperty("description");
          expect(typeof category.slug).toBe("string");
          expect(typeof category.description).toBe("string");
        });
      });
  });
});

describe("/api/reviews/:review_id", () => {
  test("GET - status:200 - return review object with id ", () => {
    return request(app)
      .get(`/api/reviews/1`)
      .expect(200)
      .then((response) => {
        expect(typeof response.body.review).toEqual("object");
        const review = response.body.review;
        expect(review.review_id).toBe(1);
        expect(review.title).toBe("Agricola");
        expect(review.review_body).toBe("Farmyard fun!");
        expect(review.designer).toBe("Uwe Rosenberg");
        expect(review.review_img_url).toBe(
          "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700"
        );
        expect(review.votes).toBe(1);
        expect(review.category).toBe("euro game");
        expect(review.owner).toBe("mallionaire");
        expect(review.created_at).toBe("2021-01-18T10:00:20.514Z");
      });
  });
  test("GET -status:400 - invalid review ID ", () => {
    return request(app)
      .get("/api/reviews/random")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("GET -status:404 - valid ID but non-existent review ID", () => {
    return request(app)
      .get("/api/reviews/1200")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
});

describe("/api/reviews", () => {
  test("GET - status:200 - array of review objects ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        expect(response.body.review.length).toBe(13);
        expect(typeof response.body).toEqual("object");
        const reviews = response.body.review;
        reviews.forEach((review) => {
          expect(typeof review.review_id).toBe("number");
          expect(typeof review.title).toBe("string");
          expect(typeof review.designer).toBe("string");
          expect(typeof review.review_img_url).toBe("string");
          expect(typeof review.votes).toBe("number");
          expect(typeof review.category).toBe("string");
          expect(typeof review.owner).toBe("string");
          expect(typeof review.created_at).toBe("string");
          expect(typeof review.comment_count).toBe("number");
        });
      });
  });
});

describe("/api/reviews", () => {
  test('"GET - status:200 - sort by "created_at" with a "sort_by" query, in descending order by default', () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const reviews = response.body.review;
        expect(reviews).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  test("GET- status:200 - array of comments for the given review_id", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(Array.isArray(comments)).toBe(true);
        comments.forEach((comment) => {
          expect(comments.length).toBe(3);
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.review_id).toBe("number");
        });
      });
  });
  test("GET -status:400 - invalid review ID ", () => {
    return request(app)
      .get("/api/reviews/random/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("GET -status:404 - valid ID but non-existent review ID", () => {
    return request(app)
      .get("/api/reviews/123/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
  test("GET -status:200 - valid ID returns empty array when review has no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toEqual([]);
      });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  test("POST - status:201 - post a new comment with two new properties of username and body", () => {
    const newComment = {
      username: "bainesface",
      body: "I don't know what to write",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment.review_id).toBe(1);
        expect(body.comment.author).toBe("bainesface");
        expect(body.comment.body).toBe("I don't know what to write");
        expect(typeof body.comment.votes).toBe("number");
        expect(typeof body.comment.created_at).toBe("string");
        expect(typeof body.comment.comment_id).toBe("number");
      });
  });
  test("POST -status:400 - invalid review ID ", () => {
    return request(app)
      .post("/api/reviews/random/comments")
      .send({ username: "mallionaire", body: "Really great!" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("POST -status:404 - valid ID but non-existent review ID", () => {
    return request(app)
      .post("/api/reviews/123/comments")
      .send({ username: "mallionaire", body: "Really great!" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
  test("Post - status: 404 - responds with Username does not exist", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "random123", body: "Really great!" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
  test("Post - status: 404 - responds with missing comment", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "mallionaire", body: "" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Missing comment");
      });
  });
  test("Post - status: 404 - responds with invalid properties", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ random: "mallionaire", thing: "Really great!" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid properties");
      });
  });
});

describe("/api/reviews/:review_id", () => {
  test("PATCH - status:200 - Increment votes property by given amount", () => {
    const newVotes = { inc_votes: 2 };
    return request(app)
      .patch("/api/reviews/1")
      .send(newVotes)
      .expect(200)
      .then((response) => {
        expect(response.body.review).toEqual({
          review_id: 1,
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 3,
        });
      });
  });
  test("PATCH - status:200 - decrement votes property by given amount ", () => {
    const newVotes = { inc_votes: -3 };
    return request(app)
      .patch("/api/reviews/1")
      .send(newVotes)
      .expect(200)
      .then((response) => {
        expect(response.body.review).toEqual({
          review_id: 1,
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: -2,
        });
      });
  });
  test("PATCH -status: 400 - invalid review ID ", () => {
    const newVotes = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/random")
      .send(newVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("PATCH - status: 404 - valid ID but non-existent review ID", () => {
    const newVotes = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/123")
      .send(newVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
  test("PATCH - status:404 - missing value", () => {
    const newVotes = { random: 1 };
    return request(app)
      .patch("/api/reviews/1")
      .send(newVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid properties");
      });
  });
  test("PATCH - status:400- missing  properties", () => {
    const newVotes = {};
    return request(app)
      .patch("/api/reviews/1")
      .send(newVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid properties");
      });
  });
});

describe('/api/comments/:comment_id', () => {
  test('DELETE - status:204 - delete the given comment by comment_id ', () => {
    return request(app)
    .delete(`/api/comments/1`)
    .expect(204)
    .then((response)=>{
      expect(response.body).toEqual({})
      expect(response.status).toBe(204);
    })
  });
});