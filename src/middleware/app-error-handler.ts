import { finished } from 'stream';
//
import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import { createRequestErrorResponseMessage, logRequestError } from '../logger';

const appErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const handleError = (code: number): void => {
    const { method, url } = req;
    const message = createRequestErrorResponseMessage(
      method,
      url,
      code,
      err.message
    );

    res.status(code).send(message);

    finished(res, () => {
      setImmediate(() => {
        logRequestError(message);
      });
    });
  };

  switch (err.name) {
    case 'EntityNotFound': {
      handleError(StatusCodes.NOT_FOUND);
      break;
    }
    case 'MethodNotAllowedError': {
      handleError(StatusCodes.METHOD_NOT_ALLOWED);
      break;
    }
    case 'EntityForbiddenError': {
      handleError(StatusCodes.FORBIDDEN);
      break;
    }
    case 'CustomError':
    default: {
      handleError(StatusCodes.INTERNAL_SERVER_ERROR);
      next();
    }
  }
};

export default appErrorHandler;
