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

describe("POST /attempts", () => {
  test("201", async () => {
    const attemptRequest = {
      quiz_id: 2,
    };
    const { body } = await request(app)
      .post("/attempt")
      .send(attemptRequest)
      .expect(201);

    const attempt = body.attempt;

    expect(attempt.attempt_id).toBe(5);
    expect(attempt.quiz_id).toBe(2);
    expect(attempt.score).toBe("0.00");
  });

  test("400: Responds with bad request when an invalid request is made", async () => {
    const badAttemptRequest = {
      quiz_id: "cheese",
    };
    const { body } = await request(app)
      .post("/attempt")
      .send(badAttemptRequest)
      .expect(400);

    expect(body.msg).toBe("Bad request");
  });
});


describe("POST /attempts/:attempt_id/score", () => {

    
    
  
  
  });
