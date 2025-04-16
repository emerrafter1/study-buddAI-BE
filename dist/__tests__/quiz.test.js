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
describe("GET /quizzes/:user_id", () => {
    test("200", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/quizzes/3").expect(200);
        expect(body.quizzes.length).toBe(1);
        expect(body.quizzes[0].user_id).toBe(3);
        expect(body.quizzes[0].quiz_id).toBe(4);
        expect(body.quizzes[0].created_at).toBe("2025-04-14T11:45:00.000Z");
        expect(body.quizzes[0].quiz_name).toBe("Intro to Literature");
        expect(body.quizzes[0].file_id).toBe(4);
    }));
    test("200", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/quizzes/1").expect(200);
        const quizzes = body.quizzes;
        expect(quizzes.length).toBe(2);
        quizzes.forEach((quiz) => {
            expect(typeof quiz.quiz_id).toBe("number");
            expect(typeof quiz.user_id).toBe("number");
            expect(typeof quiz.quiz_name).toBe("string");
            expect(typeof quiz.file_id).toBe("number");
            expect(typeof quiz.created_at).toBe("string");
        });
    }));
    test("400: Responds with bad request when an invalid request is made", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/quizzes/banana").expect(400);
        expect(body.msg).toBe("Bad request");
    }));
    test("404: Responds with not found when a valid request when is made and the record does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/quizzes/799").expect(404);
        expect(body.msg).toBe("Not found");
    }));
});
describe("POST /quizzes", () => {
    test("201", () => __awaiter(void 0, void 0, void 0, function* () {
        const quizRequest = {
            user_id: 2,
            quiz_name: "Test post quiz",
            file_id: 3,
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/quizzes")
            .send(quizRequest)
            .expect(201);
        const quiz = body.quiz;
        expect(quiz.quiz_id).toBe(5);
        expect(quiz.user_id).toBe(2);
        expect(quiz.quiz_name).toBe("Test post quiz");
        expect(quiz.file_id).toBe(3);
    }));
    test("400: Responds with bad request when an invalid request is made", () => __awaiter(void 0, void 0, void 0, function* () {
        const badQuizRequest = {
            user_id: "dog",
            quiz_name: "Test post quiz",
            file_id: 3,
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/quizzes")
            .send(badQuizRequest)
            .expect(400);
        expect(body.msg).toBe("Bad request");
    }));
});
