import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as yaml from 'yamljs';
//
import { AppModule } from './app.module';
import { seedAdmin } from './utils/seed-admin';
import { logger } from './common';
import { AllExceptionFilter } from './filters/';

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
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  SwaggerModule.setup('doc', app, yaml.load(path.resolve('doc/api.yaml')));

  await seedAdmin();

  const port = app.get(ConfigService).get('PORT');

  await app.listen(port, () => {
    logger.logDebug(`App is running on port ${port}`);
  });
}

bootstrap();
