"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../data/test-data/index");
var seed_1 = require("./seed");
var connection_1 = require("../connection");
var runSeed = function () {
    return (0, seed_1.default)(index_1.default).then(function () { return connection_1.default.end(); });
};
runSeed();
