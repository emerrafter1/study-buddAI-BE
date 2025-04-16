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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
beforeEach(() => {
    console.log('Type of app:', typeof app_1.default); // should be function
    console.log('Is app a function:', typeof app_1.default === 'function'); // true
    return (0, seed_1.default)(test_data_1.default);
});
afterAll(() => {
    return connection_1.default.end();
});
describe("POST /files/upload", () => {
    test("201: Successfully uploads a PDF file", () => __awaiter(void 0, void 0, void 0, function* () {
        const testPdfPath = path_1.default.resolve(__dirname, "../assets/test_file.pdf");
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/files/upload")
            .attach('file', testPdfPath)
            .expect(201);
        expect(response.body.success).toBe(true);
    }));
});
test("400: Returns error when no file is uploaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/files/upload")
        .expect(400);
    expect(response.body).toEqual({
        error: "No PDF uploaded"
    });
}));
test("400: Returns error when invalid file is uploaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const textPath = path_1.default.resolve(__dirname, "../assets/sample1.txt");
    if (!fs_1.default.existsSync(textPath)) {
    }
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/files/upload")
        .attach('file', textPath)
        .expect(400);
    expect(response.body.error).toBe("Not a valid PDF file");
}));
