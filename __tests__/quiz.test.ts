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

describe("GET /quizzes/:user_id", () => {
  test("200", async () => {
    const { body } = await request(app).get("/quizzes/3").expect(200);
    expect(body.quizzes.length).toBe(1);
    expect(body.quizzes[0].user_id).toBe(3);
    expect(body.quizzes[0].quiz_id).toBe(4);
    expect(body.quizzes[0].created_at).toBe("2025-04-14T11:45:00.000Z");
    expect(body.quizzes[0].quiz_name).toBe("Intro to Literature");
    expect(body.quizzes[0].file_id).toBe(4);
  });

  test("200", async () => {
    const { body } = await request(app).get("/quizzes/2").expect(200);
    const quizzes = body.quizzes;
    expect(quizzes.length).toBe(2);
    quizzes.forEach((quiz) => {
      expect(typeof quiz.quiz_id).toBe("number");
      expect(typeof quiz.user_id).toBe("number");
      expect(typeof quiz.quiz_name).toBe("string");
      expect(typeof quiz.file_id).toBe("number");
      expect(typeof quiz.created_at).toBe("string");
    });
  });

  test("400: Responds with bad request when an invalid request is made", async () => {
    const { body } = await request(app).get("/quizzes/banana").expect(400);
    expect(body.msg).toBe("Bad request");
  });

  test("404: Responds with not found when a valid request when is made and the record does not exist", async () => {
    const { body } = await request(app).get("/quizzes/799").expect(404);

    expect(body.msg).toBe("Not found");
  });
});

describe("POST /quizzes", () => {
  test("201", async () => {
    const quizRequest = {
      user_id: 2,
      quiz_name: "Test post quiz",
      file_id: 3,
    };
    const { body } = await request(app)
      .post("/quizzes")
      .send(quizRequest)
      .expect(201);

    const quiz = body.quiz;

    expect(quiz.quiz_id).toBe(5);
    expect(quiz.user_id).toBe(2);
    expect(quiz.quiz_name).toBe("Test post quiz");
    expect(quiz.file_id).toBe(3);
  });

  test("400: Responds with bad request when an invalid request is made", async () => {
    const badQuizRequest = {
      user_id: "dog",
      quiz_name: "Test post quiz",
      file_id: 3,
    };
    const { body } = await request(app)
      .post("/quizzes")
      .send(badQuizRequest)
      .expect(400);

    expect(body.msg).toBe("Bad request");
  });
});
