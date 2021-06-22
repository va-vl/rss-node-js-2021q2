import { finished } from 'stream';
//
import express from 'express';
//
import { createRequestResponseMessage, logRequest } from '../logger';

const appRequestLogger: express.RequestHandler = (req, res, next) => {
  const requestStart = new Date();
  const { method, url, body, query } = req;

  next();

  finished(res, () => {
    const params = res.locals['params'] ?? req.params;
    const { statusCode } = res;

    logRequest(
      createRequestResponseMessage(
        requestStart,
        method,
        url,
        statusCode,
        JSON.stringify(params),
        JSON.stringify(query),
        JSON.stringify(body)
      )
    );
  });
};

export default appRequestLogger;
