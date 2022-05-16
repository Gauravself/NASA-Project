const request = require("supertest");
const app = require("../../app");

describe("TEST GET/launches", () => {
  test("It should respond with 200 status code", async () => {
    const response = await request(app)
                           .get("/launches")
                           .expect('Content-Type',/json/)
                           .expect(200);
  });
});

describe("", () => {
  test("It should respond with 200 code", () => {});
  test("It should catch missing required properties", () => {});
  test("It should catch invaid dates", () => {});
});
