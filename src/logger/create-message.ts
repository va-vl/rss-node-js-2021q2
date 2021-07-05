const createMessageLine = (...str: string[]): string => str.join(' | ');

export const createRequestResponseMessage = (
  requestStart: Date,
  method: string,
  url: string,
  statusCode: number,
  urlParamsStr: string,
  queryParamsStr: string,
  bodyStr: string
): string =>
  createMessageLine(
    `${method} ${url} ${statusCode} [${Date.now() - +requestStart} ms]`,
    `URL params: ${urlParamsStr}`,
    `Query params: ${queryParamsStr}`,
    `Request body: ${bodyStr}`
  );

export const createRequestErrorResponseMessage = (
  method: string,
  url: string,
  statusCode: number,
  errorMessage: string
): string => createMessageLine(`${method} ${url} ${statusCode}`, errorMessage);

export const createFatalErrorLogMessage = (
  message: string,
  errorMessage: string,
  stack: string
): string => createMessageLine(message, errorMessage, stack);
