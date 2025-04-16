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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield connection_1.default.getConnection();
    console.log("Database connected:", connection.config.database);
}));
describe("POST /api/attempt_answer", () => {
    test("201", () => __awaiter(void 0, void 0, void 0, function* () {
        const attemptAnswerRequest = {
            question_options_id: 4,
            question_id: 3,
            attempt_id: 1,
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/attempt_answer")
            .send(attemptAnswerRequest)
            .expect(201);
        const attemptAnswer = body.attemptAnswer;
        expect(attemptAnswer.attempt_answer_id).toBe(5);
        expect(attemptAnswer.question_options_id).toBe(4);
        expect(attemptAnswer.question_id).toBe(3);
        expect(attemptAnswer.attempt_id).toBe(1);
    }));
    test("400: Responds with bad request when an invalid request is made", () => __awaiter(void 0, void 0, void 0, function* () {
        const badAttemptAnswerRequest = {
            question_options_id: "cheese",
            question_id: 3,
            attempt_id: 1,
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/attempt_answer")
            .send(badAttemptAnswerRequest)
            .expect(400);
        expect(body.msg).toBe("Bad request");
    }));
});
describe("GET /api/attempt_answer/:question_id", () => {
    test("200", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/attempt_answer/3").expect(200);
        const attemptAnswer = body.attemptAnswer;
        expect(attemptAnswer.attempt_answer_id).toBe(3);
        expect(attemptAnswer.question_id).toBe(3);
        expect(attemptAnswer.attempt_id).toBe(2);
        expect(attemptAnswer.question_options_id).toBe(10);
    }));
    test("400: Responds with bad request when an invalid request is made", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/attempt_answer/banana").expect(400);
        expect(body.msg).toBe("Bad request");
    }));
    test("404: Responds with not found when a valid request when is made and the record does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/attempt_answer/799").expect(404);
        expect(body.msg).toBe("Not found");
    }));
});
