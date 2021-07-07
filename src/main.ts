import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
//
import { AppModule } from './app.module';
import { seedAdmin } from './utils/seed-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await seedAdmin();

  const port = app.get(ConfigService).get('PORT');

  await app.listen(port, () => {
    process.stdout.write(`App is running on port ${port}\n`);
  });
}

bootstrap();
