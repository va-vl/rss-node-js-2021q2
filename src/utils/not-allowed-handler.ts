import express from 'express';
import { MethodNotAllowedError } from '../errors';

const notAllowedHandler: express.RequestHandler = (_req, _res, next): void => {
  next(new MethodNotAllowedError());
};

export default notAllowedHandler;
