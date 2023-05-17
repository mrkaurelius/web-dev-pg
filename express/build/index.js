"use strict";
/**
 * Type'li express
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares/middlewares");
const promise_pg_1 = require("./handlers/promise-pg");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(middlewares_1.myLogger);
/**
 * app.get(path, callback [, callback ...])
 * A middleware function.
 * A series of middleware functions (separated by commas).
 * An array of middleware functions.
 * A combination of all of the above.
 */
//? route'leri baska bir module de tanimlasam nasil tanimlarim?
app.get('/promise', promise_pg_1.myPromisePgHandler);
// You define error-handling middleware last, after other app.use() and routes calls; for example:
app.use(middlewares_1.myErrorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
