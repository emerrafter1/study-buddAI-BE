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

describe("POST /quizzes/:user_id", () => {
  test("200", async () => {
    const { body } = await request(app).get("/quizzes/3").expect(200);
    expect(body.quizzes.length).toBe(1)
    expect(body.quizzes[0].user_id).toBe(3);
    expect(body.quizzes[0].quiz_id).toBe(4);
    expect(body.quizzes[0].created_at).toBe("2025-04-14T11:45:00.000Z");
    expect(body.quizzes[0].quiz_name).toBe("Intro to Literature");
    expect(body.quizzes[0].file_id).toBe(4);
  });
});
