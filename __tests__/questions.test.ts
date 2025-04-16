
import request from "supertest";
import app from "../app";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import testData from "../db/data/test-data";

beforeEach(() => {
    return seed(testData)
  });
  
afterAll(() => {
    return db.end();
  });

  interface Question {
    question_id: number;
    quiz_id: number;
    question_body: string;
  }

  describe("GET api/questions/:quiz_id", () => {
    test("200: Responds with questions for specific quiz_id", async () => {
        const {body} = await request(app)
        .get("/api/questions/1")
        .expect(200)
        const questions: Question[] = body.questions
        expect(questions.length).toBeGreaterThan(0)
        questions.forEach((question) => {
          expect(question).toMatchObject({
            question_id: expect.any(Number),
            quiz_id: expect.any(Number),
            question_body: expect.any(String)
          })
        })
     })
     test('400: responds with bad request if quiz_id is not a number', async () => {
      const {body} = await request(app)
      .get("/api/questions/bannana")
      .expect(400)
      expect(body.msg).toBe('bad request');
  })
  test('400: responds not found when quiz_id is not found', async () => {
    const {body} = await request(app)
      .get("/api/questions/1000")
      .expect(400)
      expect(body.msg).toBe('bad request');
  })
});

  
  describe("POST api/questions", () => {
    test("201: creates and returns a new questions", async () => {
      const newQuestion = {
        quiz_id: 3,
        question_body: 'what is 4 + 4 ?'
      }
      const { body } = await request(app)
      .post("/api/questions") 
      .send(newQuestion)
      .expect(201);
      const question = body.question
    expect(question.quiz_id).toBe(3);
    expect(question.question_body).toBe("what is 4 + 4 ?");
    expect(typeof question.question_id).toBe("number");
  })
  test("400: responds with error if required fields are missing", async () => {
    const badQuestion = {
      quiz_id: "8"
    };

    const { body } = await request(app)
      .post("/api/questions") // Updated route path
      .send(badQuestion)
      .expect(400);

    expect(body.msg).toBe("Missing required fields");
  });
  test("409: responds with error if username or email already exists", async () => {
    const existingQuestion = {
        quiz_id: 1,
        question_body: 'What is the chemical symbol for water?'
    };

    const { body } = await request(app)
      .post("/api/questions")
      .send(existingQuestion)
      .expect(409);

    expect(body.msg).toMatch(/already exists/i);
  });
     })