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
describe("POST /api/users", () => {
    test("201: creates and returns a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            username: "janedoe",
            email: "jane@example.com",
            password: "securepass"
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users") // Updated route path
            .send(newUser)
            .expect(201);
        expect(body.user).toBeDefined();
        expect(body.user.username).toBe("janedoe");
        expect(body.user.email).toBe("jane@example.com");
        expect(typeof body.user.user_id).toBe("number");
    }));
    test("400: responds with error if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const badUser = {
            username: "missingemail"
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users") // Updated route path
            .send(badUser)
            .expect(400);
        expect(body.msg).toBe("Missing required fields");
    }));
    test("409: responds with error if username or email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const uniqueUsername = `testuser${Date.now()}`;
        const uniqueEmail = `test${Date.now()}@example.com`;
        const nonExistingUser = {
            username: uniqueUsername,
            email: uniqueEmail,
            password: "securepass"
        };
        // First insert should succeed with unique data
        yield (0, supertest_1.default)(app_1.default)
            .post("/api/users")
            .send(nonExistingUser)
            .expect(201);
        const existingUser = {
            username: uniqueUsername,
            email: uniqueEmail,
            password: "anotherpass"
        };
        const { body } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users")
            .send(existingUser)
            .expect(409);
        expect(body.msg).toMatch(/already exists/i);
    }));
});
