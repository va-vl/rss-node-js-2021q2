import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const requestStart = Date.now();
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

    this.logger.warn(
      [
        `${request.method} ${request.url} [${response.statusCode}] [${
          Date.now() - requestStart
        } ms]`,
        `query params: ${JSON.stringify(request.query)}`,
        `body: ${JSON.stringify(request.body)}`,
        `error: ${exception.message}`,
      ].join(' | '),
    );
  }
}
