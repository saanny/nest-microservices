import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TASK_MANAGER_PACKAGE_NAME } from 'proto/taskManager';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());
  const config = app.get<ConfigService>(ConfigService);

  app.connectMicroservice({
    name: config.get<string>('GALLATIN_GRPC_SERVICE_NAME'),
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../proto/taskManager.proto'),
      package: TASK_MANAGER_PACKAGE_NAME,
      url: config.get<string>('GALLATIN_GRPC_URL'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
