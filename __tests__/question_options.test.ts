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

describe("POST /quizzes", () => {
  test("201", async () => {
    const questionOptionRequest = {
      question_id: 4,
      option_body: "Test",
      is_correct: true,
      label: "B",
    };
    const { body } = await request(app)
      .post("/question_options")
      .send(questionOptionRequest)
      .expect(201);

      

    const questionOption = body.questionOption;

    expect(questionOption.question_id).toBe(4);
    expect(questionOption.option_body).toBe("Test");
    expect(questionOption.is_correct).toBe(1);
    expect(questionOption.label).toBe("B");
  });

  test("400: Responds with bad request when an invalid request is made", async () => {
    const badQuestionOptionRequest = {
      question_id: "bad request",
      option_body: "Test",
      is_correct: true,
      label: "B",
    };
    const { body } = await request(app)
      .post("/question_options")
      .send(badQuestionOptionRequest)
      .expect(400);

    expect(body.msg).toBe("Bad request");
  });
});
