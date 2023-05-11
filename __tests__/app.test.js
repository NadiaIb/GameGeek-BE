const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

const endpoints= require('../endpoints.json')



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
        expect(review.title).toBe('Agricola');
        expect(review.review_body).toBe('Farmyard fun!');
        expect(review.designer).toBe('Uwe Rosenberg');
        expect(review.review_img_url).toBe('https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700');
        expect(review.votes).toBe(1);
        expect(review.category).toBe('euro game');
        expect(review.owner).toBe('mallionaire');
        expect(review.created_at).toBe("2021-01-18T10:00:20.514Z");
      });
    });
  test("GET -status:400 - invalid review ID ", () => {
    return request(app)
      .get("/api/reviews/random")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request")
      });
  });
  test("GET -status:404 - valid ID but non-existent review ID", () => {
    return request(app)
    .get("/api/reviews/1200")
    .expect(404)
    .then((response)=>{
      expect(response.body.msg).toBe("not found")
    })
  });
});
