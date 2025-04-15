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

describe("POST /api/users", () => { // Updated route path
  test("201: creates and returns a new user", async () => {
    const newUser = {
      username: "janedoe",
      email: "jane@example.com",
      password: "securepass"
    };

    const { body } = await request(app)
      .post("/api/users") // Updated route path
      .send(newUser)
      .expect(201);

    expect(body.user).toBeDefined();
    expect(body.user.username).toBe("janedoe");
    expect(body.user.email).toBe("jane@example.com");
    expect(typeof body.user.user_id).toBe("number");
  });

  test("400: responds with error if required fields are missing", async () => {
    const badUser = {
      username: "missingemail"
    };

    const { body } = await request(app)
      .post("/api/users") // Updated route path
      .send(badUser)
      .expect(400);

    expect(body.msg).toBe("Missing required fields");
  });

  test("409: responds with error if username or email already exists", async () => {
    const uniqueUsername = `testuser${Date.now()}`;
    const uniqueEmail = `test${Date.now()}@example.com`;
    const nonExistingUser = {
      username: uniqueUsername,
      email: uniqueEmail,
      password: "securepass"
    };

    // First insert should succeed with unique data
    await request(app)
      .post("/api/users")
      .send(nonExistingUser)
      .expect(201);

    const existingUser = {
      username: uniqueUsername,
      email: uniqueEmail,    
      password: "anotherpass"
    };

    const { body } = await request(app)
      .post("/api/users")
      .send(existingUser)
      .expect(409);

    expect(body.msg).toMatch(/already exists/i);
  });
});