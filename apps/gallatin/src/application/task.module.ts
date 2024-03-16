import { DynamicModule, Module, Type } from '@nestjs/common';
import { TaskManagerFactory } from '../domain/factories/taskManager.factory';
import { TaskController } from '../presenter/grpc/task.controller';
import { TaskService } from './task.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateTaskHandler } from './commands/create-task.handler';

const CommandHandlers = [CreateTaskHandler];
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ASHLAND',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'logger',
          },
        }),
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
