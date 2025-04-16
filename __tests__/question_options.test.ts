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

describe("POST /question_options", () => {
  test("201", async () => {
    const questionOptionRequest = {
      question_id: 4,
      option_body: "Test",
      is_correct: true,
      label: "B",
    };
    const { body } = await request(app)
      .post("/api/question_options")
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
      .post("/api/question_options")
      .send(badQuestionOptionRequest)
      .expect(400);

    expect(body.msg).toBe("Bad request");
  });
});

describe("GET /question_options/:question_id", () => {
  test("200", async () => {
    const { body } = await request(app).get("/api/question_options/2").expect(200);
    const questionOptions = body.questionOptions;
    expect(questionOptions.length).toBe(4);
    questionOptions.forEach((option) => {
      expect(option.question_id).toBe(2);
      expect(typeof option.option_body).toBe("string");
      expect(typeof option.is_correct).toBe("number");
      expect(typeof option.label).toBe("string");
    });
  });

  test("400: Responds with bad request when an invalid request is made", async () => {
    const { body } = await request(app)
      .get("/api/question_options/banana")
      .expect(400);
    expect(body.msg).toBe("Bad request");
  });

  test("404: Responds with not found when a valid request when is made and the record does not exist", async () => {
    const { body } = await request(app).get("/api/question_options/799").expect(404);

    expect(body.msg).toBe("Not found");
  });
});



