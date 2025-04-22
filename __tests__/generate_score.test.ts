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

type ResultQuestions = {
  attempted_answer: string;
  correct_answer: string;
  question_body: string;
};

describe("GET /api/attempt/1/submit", () => {
  test("200", async () => {
    const { body } = await request(app)
      .get("/api/attempt/1/submit")
      .expect(200);
    

    const results = body.result;
    const resultsQuestions = results.questions as ResultQuestions[];
    console.log(results)
    expect(results.questions.length).toBe(4);
    expect(results.score).toBe(0.25);
    expect(resultsQuestions.length).toBe(4);
    resultsQuestions.forEach((result) => {
      expect(result.attempted_answer).toBeDefined();
      expect(result.question_body).toBeDefined();
      expect(result.correct_answer).toBeDefined;
    });
  });
});
