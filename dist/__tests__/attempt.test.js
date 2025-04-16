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
describe("POST /attempts", () => {
    test("201", () => __awaiter(void 0, void 0, void 0, function* () {
        const attemptRequest = {
            quiz_id: 2,
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/attempt")
            .send(attemptRequest)
            .expect(201);
        const attempt = body.attempt;
        expect(attempt.attempt_id).toBe(5);
        expect(attempt.quiz_id).toBe(2);
        expect(attempt.score).toBe("0.00");
    }));
    test("400: Responds with bad request when an invalid request is made", () => __awaiter(void 0, void 0, void 0, function* () {
        const badAttemptRequest = {
            quiz_id: "cheese",
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/attempt")
            .send(badAttemptRequest)
            .expect(400);
        expect(body.msg).toBe("Bad request");
    }));
});
describe("POST /attempts/:attempt_id/score", () => {
});
