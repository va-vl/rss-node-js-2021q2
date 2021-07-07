import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';
//
import { logger } from './../common';

@Injectable()
export default class RequestLogger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestStart = new Date();
    const { method, url, body, query } = req;

    next();

    finished(res, () => {
      const { statusCode } = res;

      logger.logRequest(
        logger.createRequestResponseMessage(
          requestStart,
          method,
          url,
          statusCode,
          JSON.stringify(query),
          JSON.stringify(body),
        ),
      );
    });
  }
}
