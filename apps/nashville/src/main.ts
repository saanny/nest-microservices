import { NestFactory } from '@nestjs/core';
import { NashvilleModule } from './application/task.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(NashvilleModule);
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(config.get<string>('NASHVILLE_HTTP_PORT'));
}
bootstrap();
