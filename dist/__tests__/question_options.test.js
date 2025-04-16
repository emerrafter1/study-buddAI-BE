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
describe("POST /question_options", () => {
    test("201", () => __awaiter(void 0, void 0, void 0, function* () {
        const questionOptionRequest = {
            question_id: 4,
            option_body: "Test",
            is_correct: true,
            label: "B",
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/question_options")
            .send(questionOptionRequest)
            .expect(201);
        const questionOption = body.questionOption;
        expect(questionOption.question_id).toBe(4);
        expect(questionOption.option_body).toBe("Test");
        expect(questionOption.is_correct).toBe(1);
        expect(questionOption.label).toBe("B");
    }));
    test("400: Responds with bad request when an invalid request is made", () => __awaiter(void 0, void 0, void 0, function* () {
        const badQuestionOptionRequest = {
            question_id: "bad request",
            option_body: "Test",
            is_correct: true,
            label: "B",
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/question_options")
            .send(badQuestionOptionRequest)
            .expect(400);
        expect(body.msg).toBe("Bad request");
    }));
});
describe("GET /question_options/:question_id", () => {
    test("200", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/question_options/2").expect(200);
        const questionOptions = body.questionOptions;
        expect(questionOptions.length).toBe(4);
        questionOptions.forEach((option) => {
            expect(option.question_id).toBe(2);
            expect(typeof option.option_body).toBe("string");
            expect(typeof option.is_correct).toBe("number");
            expect(typeof option.label).toBe("string");
        });
    }));
    test("400: Responds with bad request when an invalid request is made", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .get("/question_options/banana")
            .expect(400);
        expect(body.msg).toBe("Bad request");
    }));
    test("404: Responds with not found when a valid request when is made and the record does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(app_1.default).get("/quizzes/799").expect(404);
        expect(body.msg).toBe("Not found");
    }));
});
