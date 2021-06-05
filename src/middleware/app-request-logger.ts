import { writeFileSync } from 'fs';
import { finished } from 'stream';
//
import express from 'express';
//
import { logCreator } from '../utils';

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
    const logParams = `URL params: ${JSON.stringify(params)}`;
    const logQuery = `Query params: ${JSON.stringify(query)}`;
    const logBody = `Request body: ${JSON.stringify(body)}`;

    const [logPlain, logColorized] = logCreator([
      [logDateTime, 'yellow'],
      [logRequest, 'yellow'],
      ['----------', 'yellow'],
      [logParams],
      [logQuery],
      [logBody],
    ]);

    process.stdout.write(logColorized);

    writeFileSync('request-log.txt', logPlain, {
      encoding: 'utf-8',
      flag: 'a',
    });
  });
};

export default appRequestLogger;
