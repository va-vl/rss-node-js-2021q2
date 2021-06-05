import express from 'express';
import { StatusCodes } from 'http-status-codes';

interface HandledError extends Error {
  code?: string;
}

const appErrorHandler = (
  err: HandledError,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  switch (err.code) {
    case 'ERR_ENTITY_NOT_FOUND': {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
      break;
    }
    case 'ERR_INVALID_OPERATION': {
      res.status(StatusCodes.BAD_REQUEST).send(err.message);
      break;
    }
    case 'ERR_CUSTOM_ERROR':
    case 'ERR_DATA_CORRUPTED': {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
      break;
    }
    default: {
      next(err);
    }
  }
};

export default appErrorHandler;
