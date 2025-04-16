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

    expect(attemptAnswer.attempt_answer_id).toBe(9);
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

describe("GET /api/attempt_answer/:question_id", () => {
  test("200", async () => {
    const { body } = await request(app).get("/attempt_answer/3").expect(200);


    const attemptAnswer = body.attemptAnswer;

    expect(attemptAnswer.attempt_answer_id).toBe(3);
    expect(attemptAnswer.question_id).toBe(3);
    expect(attemptAnswer.attempt_id).toBe(1);
    expect(attemptAnswer.question_options_id).toBe(11);
  });

  test("400: Responds with bad request when an invalid request is made", async () => {
    const { body } = await request(app).get("/attempt_answer/banana").expect(400);
    expect(body.msg).toBe("Bad request");
  });

  test("404: Responds with not found when a valid request when is made and the record does not exist", async () => {
    const { body } = await request(app).get("/attempt_answer/799").expect(404);

    expect(body.msg).toBe("Not found");
  });
});
