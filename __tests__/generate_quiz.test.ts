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

describe("POST /api/1/generate_quiz", () => {
  test.skip("200", async () => {
    const quizRequest = {
      quiz_name: "My quiz about dogs",
    };

    const { body } = await request(app)
      .post("/api/1/generate_quiz")
      .send(quizRequest)
      .expect(201);
  

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const quiz = body.quiz;
    const quizQuestions = quiz.questions;

    expect(quiz.title).toBe("My quiz about dogs");
    expect(quizQuestions.length).toBe(4);
    quizQuestions.forEach((question) => {
      expect(question.options.length).toBe(4);
    });
  });
});
