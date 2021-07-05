import { finished } from 'stream';
//
import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import { createRequestErrorResponseMessage, logRequestError } from '../logger';

const resourceNotFoundHandler: express.RequestHandler = (req, res, next) => {
  if (res.statusCode !== StatusCodes.NOT_FOUND) {
    next();
  }

  const { method, url } = req;
  const message = createRequestErrorResponseMessage(
    method,
    url,
    StatusCodes.NOT_FOUND,
    `Not Found: Endpoint ${method} ${url} does not exist.`
  );

  res.status(StatusCodes.NOT_FOUND).send(message);

  finished(res, () => {
    setImmediate(() => {
      logRequestError(message);
    });
  });
};

export default resourceNotFoundHandler;
