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

describe("POST /api/attempt_answer", () => {
  test("201", async () => {
    const attemptAnswerRequest = {
      question_options_id: 4,
      question_id: 3,
      attempt_id: 1,
    };
    const { body } = await request(app)
      .post("/attempt_answer")
      .send(attemptAnswerRequest)
      .expect(201);

    const attemptAnswer = body.attemptAnswer;

    expect(attemptAnswer.attempt_answer_id).toBe(5);
    expect(attemptAnswer.question_options_id).toBe(4);
    expect(attemptAnswer.question_id).toBe(3);
    expect(attemptAnswer.attempt_id).toBe(1);
  });




  test("400: Responds with bad request when an invalid request is made", async () => {
    const badAttemptAnswerRequest = {
        question_options_id: "cheese",
        question_id: 3,
        attempt_id: 1,
    };
    const { body } = await request(app)
      .post("/attempt_answer")
      .send(badAttemptAnswerRequest)
      .expect(400);

    expect(body.msg).toBe("Bad request");
  });
});
