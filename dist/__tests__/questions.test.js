"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const connection_1 = __importDefault(require("../db/connection"));
const seed_1 = __importDefault(require("../db/seeds/seed"));
const test_data_1 = __importDefault(require("../db/data/test-data"));
beforeEach(() => {
    return (0, seed_1.default)(test_data_1.default);
});
afterAll(() => {
    return connection_1.default.end();
});
describe("GET api/questions/:quiz_id", () => {
    test("200: Responds with questions for specific quiz_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/questions/1")
            .expect(200);
        const questions = body.questions;
        expect(questions.length).toBeGreaterThan(0);
        questions.forEach((question) => {
            expect(question).toMatchObject({
                question_id: expect.any(Number),
                quiz_id: expect.any(Number),
                question_body: expect.any(String)
            });
        });
    }));
    test('400: responds with bad request if quiz_id is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/questions/bannana")
            .expect(400);
        expect(body.msg).toBe('bad request');
    }));
    test('400: responds not found when quiz_id is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/questions/1000")
            .expect(400);
        expect(body.msg).toBe('bad request');
    }));
});
describe("POST api/questions", () => {
    test("201: creates and returns a new questions", () => __awaiter(void 0, void 0, void 0, function* () {
        const newQuestion = {
            quiz_id: 3,
            question_body: 'what is 4 + 4 ?'
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/questions")
            .send(newQuestion)
            .expect(201);
        const question = body.question;
        expect(question.quiz_id).toBe(3);
        expect(question.question_body).toBe("what is 4 + 4 ?");
        expect(typeof question.question_id).toBe("number");
    }));
    test("400: responds with error if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const badQuestion = {
            quiz_id: "8"
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/questions") // Updated route path
            .send(badQuestion)
            .expect(400);
        expect(body.msg).toBe("Missing required fields");
    }));
    test("409: responds with error if username or email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingQuestion = {
            quiz_id: 1,
            question_body: 'What is the chemical symbol for water?'
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/questions")
            .send(existingQuestion)
            .expect(409);
        expect(body.msg).toMatch(/already exists/i);
    }));
});
