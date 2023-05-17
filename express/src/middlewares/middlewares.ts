import { Request, Response, NextFunction } from 'express';

export const myLogger = function (req: Request, res: Response, next: NextFunction) {
  console.log(`request ip ${req.ip}`);
  console.log(`request hostname ${req.hostname}`);
  next(); // sonraki middleware route handler
};

export const myErrorHandler = function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log("geldik benim error handler'ime");
  console.log(err);
  res.status(500).send({ message: err.message || 'some error happened idk' });
};