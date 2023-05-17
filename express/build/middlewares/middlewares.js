"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myErrorHandler = exports.myLogger = void 0;
const myLogger = function (req, res, next) {
    console.log(`request ip ${req.ip}`);
    console.log(`request hostname ${req.hostname}`);
    next(); // sonraki middleware route handler
};
exports.myLogger = myLogger;
const myErrorHandler = function (err, req, res, next) {
    console.log("geldik benim error handler'ime");
    console.log(err);
    res.status(500).send({ message: err.message || 'some error happened idk' });
};
exports.myErrorHandler = myErrorHandler;
