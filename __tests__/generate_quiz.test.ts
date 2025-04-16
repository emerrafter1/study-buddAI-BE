import request from "supertest";
import app from "../app";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import testData from "../db/data/test-data";
import { generateQuiz } from "../generateQuiz";

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /quizzes/:user_id", () => {
    test("200", async () => {
      const result = await generateQuiz(1)
      console.log(result)
    });

});