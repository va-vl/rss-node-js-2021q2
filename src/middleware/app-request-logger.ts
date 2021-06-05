import { finished } from 'stream';
//
import express from 'express';
//
import { createLogStrings, logMessage } from './_service';

const appRequestLogger: express.RequestHandler = (req, res, next) => {
  const requestStart = new Date();
  const { method, url, body } = req;

  next();

  finished(res, () => {
    const { params, query } = req;
    const { statusCode } = res;
    const requestDuration = Date.now() - +requestStart;
    const logDateTime = `${requestStart.toLocaleDateString()} ${requestStart.toLocaleTimeString()}`;
    const logRequest = `${method} ${url} ${statusCode} [${requestDuration} ms]`;

    const [logPlain, logColorized] = createLogStrings([
      [logDateTime, 'yellow'],
      [logRequest, 'yellow'],
      [`URL params: ${JSON.stringify(params)}`],
      [`Query params: ${JSON.stringify(query)}`],
      [`Request body: ${JSON.stringify(body)}`],
    ]);

    logMessage(logPlain, logColorized);
  });
};

export default appRequestLogger;
