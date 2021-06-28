import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    process.stdout.write(`App started on port ${PORT}\n`);
  });
}
bootstrap();
