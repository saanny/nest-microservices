import { Module } from '@nestjs/common';
import { NashvilleController } from '../presenters/http/task.controller';
import { NashvilleService } from './task.service';
import { TaskManagerGateway } from '../presenters/webSocket/task.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  TASK_MANAGER_PACKAGE_NAME,
  TASK_MANAGER_SERVICE_NAME,
} from 'proto/taskManager';
import { join } from 'path';
console.log(join(__dirname, '..', '..', '..', 'proto', 'taskManager.proto'));
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: TASK_MANAGER_SERVICE_NAME,
        useFactory: () => ({
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
            url: 'localhost:3002',
          },
        }),
      },
    ]),
  ],
  controllers: [NashvilleController],
  providers: [NashvilleService, TaskManagerGateway],
})
export class NashvilleModule {}
