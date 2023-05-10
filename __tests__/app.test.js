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
        const categories = response.body.category;
        categories.forEach((category) => {
          expect(typeof category.slug).toBe("string");
          expect(typeof category.description).toBe("string");
        });
      });
  });
});
