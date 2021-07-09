import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as yaml from 'yamljs';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
//
import { AppModule } from './app.module';
import { seedAdmin } from './utils/seed-admin';
import { AllExceptionFilter } from './filters';
import { logger } from './common';

process.on('uncaughtException', (err) => {
  logger.logFatalError(logger.createFatalErrorLogMessage(err));
  process.exit(1);
});

process.on('unhandledRejection', (_, promise) => {
  promise.catch((err) => {
    logger.logFatalError(logger.createFatalErrorLogMessage(err));
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

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());

  SwaggerModule.setup('doc', app, yaml.load(path.resolve('doc/api.yaml')));

  await seedAdmin();

  await app.listen(Number(PORT), () => {
    logger.logDebug(`App is running on port ${PORT}`);
  });
}

bootstrap();
