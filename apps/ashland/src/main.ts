import { NestFactory } from '@nestjs/core';
import { AshlandModule } from './ashland.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AshlandModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'logger',
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
