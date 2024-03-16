import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TASK_MANAGER_PACKAGE_NAME } from 'proto/taskManager';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());

  app.connectMicroservice({
    name: 'GALLATIN',
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../proto/taskManager.proto'),
      package: TASK_MANAGER_PACKAGE_NAME,
      url: 'localhost:3002',
    },
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'gallatin_task_logs',
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
