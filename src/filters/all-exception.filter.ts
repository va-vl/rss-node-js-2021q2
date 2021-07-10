import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { finished } from 'stream';
//
import { logRequestResponse } from '../logger';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const requestStart = new Date();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status;
    let message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
    }

    const responseObject = {
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    Object.assign(
      responseObject,
      typeof message === 'string' ? { message } : message,
    );

    response.status(status).send({ ...responseObject });

    finished(response.raw ?? response, () => {
      logRequestResponse(
        'warn',
        requestStart,
        request.method,
        request.url,
        response.statusCode || response.raw?.statusCode,
        JSON.stringify(request.query),
        JSON.stringify(request.body),
        exception.message,
      );
    });
  }
}
