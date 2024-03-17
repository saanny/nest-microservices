import { DynamicModule, Module, Type } from '@nestjs/common';
import { TaskManagerFactory } from '../domain/factories/taskManager.factory';
import { TaskController } from '../presenter/grpc/task.controller';
import { TaskService } from './task.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateTaskHandler } from './commands/create-task.handler';
import { UpdateTaskHandler } from './commands/update-task.handler';
import { DeleteTaskHandler } from './commands/delete-task.handler';
import { GetAllTasksHandler } from './queries/get-tasks.query-handler';
import { GetOneTaskHandler } from './queries/get-task.query-handler';
import { ConfigService } from '@nestjs/config';

const CommandHandlers = [
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
  GetAllTasksHandler,
  GetOneTaskHandler,
];
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ASHLAND',
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('ASHLAND_URLS')],
            queue: config.get<string>('ASHLAND_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskManagerFactory, ...CommandHandlers],
})
export class TaskModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
  ): DynamicModule {
    return {
      module: TaskModule,
      imports: [infrastructureModule],
    };
  }
}
