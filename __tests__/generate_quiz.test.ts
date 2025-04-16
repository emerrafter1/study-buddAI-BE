import request from "supertest";
import app from "../app";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import testData from "../db/data/test-data";

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("post results", () => {
  test("200", async () => {
    const { body } = await request(app)
      .get("/api/attempt/1/submit")
      .expect(200);
    console.log(body);
  });
});
