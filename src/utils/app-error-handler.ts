import express from 'express';
import { StatusCodes } from 'http-status-codes';

const appErrorHandler = (
  err: { code?: string, message: string }, 
  _req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
): void => {
  switch (err.code) {
    case 'ERR_ENTITY_NOT_FOUND': {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
      break;
    }
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
