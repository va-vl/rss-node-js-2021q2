import express = require('express');

const asyncErrorHandler = (func: Function): Function => (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
): void => {
    Promise
      .resolve(func(req, res, next))
      .catch((err: Error) => { next(err); });
  };

export = asyncErrorHandler;
