import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { finished } from 'stream';
//
import { logger } from 'src/common';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
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

    finished(response, () => {
      logger.logRequestError(
        logger.createRequestErrorResponseMessage(
          request.method,
          request.url,
          response.statusCode,
          exception.message,
        ),
      );
    });
  }
}
