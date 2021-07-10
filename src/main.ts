import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as yaml from 'yamljs';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
//
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters';
import { RequestLoggingInterceptor } from './interceptors';
import { logFatalError, logDebug } from './logger';
import { seedAdmin } from './utils/seed-admin';

process.on('uncaughtException', (err) => {
  logFatalError('Uncaught Exception', err);
});

process.on('unhandledRejection', (_, promise) => {
  promise.catch((err) => {
    logFatalError('Unhandled rejection', err);
    process.exit(1);
  });
});

async function bootstrap() {
  const { PORT } = process.env;
  const app =
    process.env['USE_FASTIFY'] === 'true'
      ? await NestFactory.create<NestFastifyApplication>(
          AppModule,
          new FastifyAdapter(),
        )
      : await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new RequestLoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());

  SwaggerModule.setup('doc', app, yaml.load(path.resolve('doc/api.yaml')));

  await seedAdmin();

  await app.listen(Number(PORT), () => {
    logDebug(`App is running on port ${PORT}`);
  });
}

bootstrap();
