"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
app_1.default.listen(8080, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log("Listening on 8080");
    }
});
