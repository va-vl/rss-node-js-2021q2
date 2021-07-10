import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//
import { logRequestResponse } from '../logger';

@Injectable()
export default class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestStart = new Date();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      tap(() => {
        logRequestResponse(
          'info',
          requestStart,
          request.method,
          request.url,
          response.statusCode || response.raw?.statusCode,
          JSON.stringify(request.query),
          JSON.stringify(request.body),
        );
      }),
    );
  }
}
