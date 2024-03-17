import { NestFactory } from '@nestjs/core';
import { NashvilleModule } from './application/task.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(NashvilleModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'nashville_task_logs',
    },
  });
  await app.startAllMicroservices();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(6000);
}
bootstrap();
