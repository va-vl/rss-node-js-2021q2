import * as service from './logger-service';

export const { writeToFile } = service;

export const createRequestLogs = (
  requestStart: Date,
  method: string,
  url: string,
  statusCode: number,
  urlParamsStr: string,
  queryParamsStr: string,
  bodyStr: string
): [string, string] => {
  const requestDuration = Date.now() - +requestStart;
  const dateTime = service.createDateTimeLine(requestStart);
  const networkData = `${method} ${url} ${statusCode} [${requestDuration} ms]`;
  const urlParams = `URL params: ${urlParamsStr}`;
  const queryParams = `Query params: ${queryParamsStr}`;
  const body = `Request body: ${bodyStr}`;

  const plainLog = service.createPlainLog([
    [dateTime, networkData],
    [urlParams, queryParams, body],
  ]);

  const colorizedLog = service.createColorizedLog([
    [
      service.createLogLine(dateTime, networkData),
      service.STYLE.REQUEST_SUCCESS,
    ],
    [service.createLogLine(urlParams, queryParams, body)],
  ]);

  return [plainLog, colorizedLog];
};

export const createRequestErrorLogs = (
  method: string,
  url: string,
  statusCode: number,
  message: string
): [string, string] => {
  const dateTime = service.createDateTimeLine(new Date());
  const networkData = `${method} ${url} ${statusCode}`;

  const plainLog = service.createPlainLog([[dateTime, networkData], [message]]);

  const colorizedLog = service.createColorizedLog([
    [service.createLogLine(dateTime, networkData), service.STYLE.REQUEST_ERROR],
    [message, service.STYLE.REQUEST_ERROR],
  ]);

  return [plainLog, colorizedLog];
};

const createFatalErrorLogs = (err: Error): [string, string] => {
  const dateTime = service.createDateTimeLine(new Date());
  const message = `Exception occured! ${err.message}`;
  const stack = `Stack: ${err.stack}`;

  const plainLog = service.createPlainLog([[dateTime, message], [stack]]);

  const colorizedLog = service.createColorizedLog([
    [dateTime, service.STYLE.FATAL_ERROR],
    [message, service.STYLE.FATAL_ERROR],
    [stack, service.STYLE.FATAL_ERROR],
  ]);

  return [plainLog, colorizedLog];
};

export const logFatalError = (err: Error): void => {
  const [plainLog, colorizedLog] = createFatalErrorLogs(err);
  writeToFile('./logs/combined.log', plainLog);
  writeToFile('./logs/fatal-errors.log', plainLog);
  process.stderr.write(colorizedLog);
  process.exit(1);
};