import { finished } from 'stream';
//
import express from 'express';
//
import { writeToFile, createRequestLogs } from '../logger';

const appRequestLogger: express.RequestHandler = (req, res, next) => {
  const requestStart = new Date();

  next();

  finished(res, () => {
    const { method, url, body, params, query } = req;
    const { statusCode } = res;
    const [plainLog, colorizedLog] = createRequestLogs(
      requestStart,
      method,
      url,
      statusCode,
      JSON.stringify(params),
      JSON.stringify(query),
      JSON.stringify(body)
    );

    writeToFile('./logs/combined.log', plainLog);
    process.stdout.write(colorizedLog);
  });
};

export default appRequestLogger;
