import request from "supertest";
import app from "../app";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import testData from "../db/data/test-data";
import { generateResults } from "../generateResults";

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /quizzes/:user_id", () => {
    test("200", async () => {
      const result = await generateResults(1)
      console.log(result)
      
    });

});