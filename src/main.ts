import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedAdmin } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = app.get(ConfigService).get('PORT');

  await app.listen(port, () => {
    process.stdout.write(`App is running on port ${port}\n`);
  });

  await seedAdmin();
}

bootstrap();
