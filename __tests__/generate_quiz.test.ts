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
  test("200", async () => {
    const quizRequest = {
      user_id: 1,
      quiz_name: "My quiz about dogs",
      file_id: 1,
    };

    const { body } = await request(app)
      .post("/api/generate_quiz")
      .send(quizRequest)
      .expect(201);

    expect(body.quiz_id).toBe(5);

    // const quiz = body.quiz;
    // const quizQuestions = quiz.questions;

    // expect(quiz.title).toBe("My quiz about dogs");
    // expect(quizQuestions.length).toBe(4);
    // quizQuestions.forEach((question) => {
    //   expect(question.options.length).toBe(4);
    // });
  });
});
