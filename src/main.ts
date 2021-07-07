import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as yaml from 'yamljs';
//
import { AppModule } from './app.module';
import { seedAdmin } from './utils/seed-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await seedAdmin();

  const swaggerDocument = yaml.load(path.resolve('doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);

  const port = app.get(ConfigService).get('PORT');

  await app.listen(port, () => {
    process.stdout.write(`App is running on port ${port}\n`);
  });
}

bootstrap();
