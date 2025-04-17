import request from "supertest";
import app from "../app";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import testData from "../db/data/test-data";
import path from "path";
import fs from "fs";

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("POST /files/upload", () => {

  test("201: Successfully uploads a PDF file", async () => {
    const testPdfPath = path.resolve(__dirname, "../assets/wiki.pdf");
    const response = await request(app)
      .post("/files/upload")
      .attach('file', testPdfPath)
      .field("user_id", "1")
      .expect(201);
    expect(response.body.success).toBe(true);
    });
  });

  test("400: Returns error when no file is uploaded", async () => {
    const response = await request(app)
      .post("/files/upload")
      .expect(400);
    expect(response.body).toEqual({
      error: "No PDF uploaded"
    });
  });

  test("400: Returns error when invalid file is uploaded", async () => {
    const textPath = path.resolve(__dirname, "../assets/sample1.txt");
    if (!fs.existsSync(textPath)) {
      }
    const response = await request(app)
      .post("/files/upload")
      .attach('file', textPath)
      .expect(400);

    expect(response.body.error).toBe("Not a valid PDF file");

  })
