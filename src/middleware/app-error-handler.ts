import { finished } from 'stream';
//
import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import { createRequestErrorLogs, logRequestError } from '../logger';

interface HandledError extends Error {
  code?: string;
}

const appErrorHandler = (
  err: HandledError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const handleError = (code: number): void => {
    const { method, url } = req;
    const [plainLog, colorizedLog] = createRequestErrorLogs(
      method,
      url,
      code,
      err.message
    );

    res.status(code).send(plainLog);

    finished(res, () => {
      setImmediate(() => {
        logRequestError(plainLog, colorizedLog);
      });
    });
  };

  switch (err.code) {
    case 'ERR_ENTITY_NOT_FOUND': {
      handleError(StatusCodes.NOT_FOUND);
      break;
    }
    case 'ERR_INVALID_OPERATION': {
      handleError(StatusCodes.BAD_REQUEST);
      break;
    }
    case 'ERR_CUSTOM_ERROR':
    case 'ERR_DATA_CORRUPTED':
    default: {
      handleError(StatusCodes.INTERNAL_SERVER_ERROR);
      next();
    }
  }
};

export default appErrorHandler;
