const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => connection.end());

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

describe.only("/api/reviews/:review_id", () => {
  test("GET - status:200 - return review object with id ", () => {
    const reviewId = 6;
    return request(app)
      .get(`/api/reviews/${reviewId}`)
      .set("review_id", reviewId)
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toEqual("object");
        expect(typeof response.body.review).toEqual("object");
        const review = response.body.review;
        expect(typeof review.review_id).toBe("number");
        expect(typeof review.title).toBe("string");
        expect(typeof review.review_body).toBe("string");
        expect(typeof review.designer).toBe("string");
        expect(typeof review.review_img_url).toBe("string");
        expect(typeof review.votes).toBe("number");
        expect(typeof review.category).toBe("string");
        expect(typeof review.owner).toBe("string");
        expect(typeof review.created_at).toBe("string");
      });
  });
  // test("GET -status:400 - invalid review ID ", () => {
  //   return request(app)
  //     .get("/api/reviews/random")
  //     .expect(404)
  //     .then((response) => {
  //       expect(response.msg).toBe("Invalid Endpoint")
  //     });
  // });
});
