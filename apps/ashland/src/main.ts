import { NestFactory } from '@nestjs/core';
import { LoggerModule } from './application/logger.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(LoggerModule);
  const config = app.get<ConfigService>(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [config.get<string>('ASHLAND_URLS')],
      queue: config.get<string>('ASHLAND_QUEUE'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
