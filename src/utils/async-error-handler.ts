import express from 'express';

const asyncErrorHandler = (
  func: express.RequestHandler
): express.RequestHandler => (req, res, next): void => {
  res.locals['params'] = req.params;

  Promise.resolve(func(req, res, next)).catch((err: Error) => {
    next(err);
  });
};

export default asyncErrorHandler;
