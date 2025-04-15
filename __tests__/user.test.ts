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

describe("POST /users", () => {
  test("201: creates and returns a new user", async () => {
    const newUser = {
      username: "janedoe",
      email: "jane@example.com",
      password: "securepass"
    };

    const { body } = await request(app)
      .post("/users")
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
      .post("/users")
      .send(badUser)
      .expect(400);

    expect(body.msg).toBe("Missing required fields");
  });

  test("409: responds with error if username or email already exists", async () => {
    const existingUser = {
      username: "janedoe",
      email: "jane@example.com",
      password: "securepass"
    };

    // First insert
    await request(app).post("/users").send(existingUser).expect(201);

    // Second insert should fail
    const { body } = await request(app)
      .post("/users")
      .send(existingUser)
      .expect(409);

    expect(body.msg).toMatch(/already exists/i);
  });
});
