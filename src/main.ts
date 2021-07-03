import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = app.get(ConfigService).get('PORT');

  await app.listen(port, () => {
    process.stdout.write(`App is running on port ${port}\n`);
  });
}

bootstrap();
