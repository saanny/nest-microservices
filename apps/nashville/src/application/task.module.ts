import { Module } from '@nestjs/common';
import { HttpTaskController } from '../presenters/http/task.controller';
import { TaskService } from './task.service';
import { TaskManagerGateway } from '../presenters/webSocket/task.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  TASK_MANAGER_PACKAGE_NAME,
  TASK_MANAGER_SERVICE_NAME,
} from 'proto/taskManager';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: TASK_MANAGER_SERVICE_NAME,
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            protoPath: join(
              __dirname,
              '..',
              '..',
              '..',
              'proto',
              'taskManager.proto',
            ),
            package: TASK_MANAGER_PACKAGE_NAME,
            url: config.get<string>('GALLATIN_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [HttpTaskController],
  providers: [TaskService, TaskManagerGateway],
})
export class NashvilleModule {}
