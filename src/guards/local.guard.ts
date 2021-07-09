import {
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
//
import { logger as myLogger } from 'src/common';
import { finished } from 'stream';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const requestStart = new Date();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    finished(response.raw ?? response, () => {
      this.logger.log({
        level: 'info',
        message: myLogger.createRequestResponseMessage(
          requestStart,
          request.method,
          request.url,
          response.statusCode || response.raw.statusCode,
          JSON.stringify(request.query),
          JSON.stringify(request.body),
        ),
      });
    });

    return super.canActivate(context);
  }
}
