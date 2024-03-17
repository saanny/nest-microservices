import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { TaskRepository } from '../ports/task.repository';
import { TaskManagerFactory } from '../../domain/factories/taskManager.factory';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  private readonly logger = new Logger(CreateTaskHandler.name);
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskFactory: TaskManagerFactory,
    @Inject('ASHLAND') private ashlandClient: ClientProxy,
  ) {}

  async execute(command: CreateTaskCommand) {
    this.logger.debug(
      `Processing "CreateTaskCommand": ${JSON.stringify(command)}`,
    );

    const task = this.taskFactory.create({
      title: command.title,
      description: command.description,
      parentId: command.parentId,
    });
    const result = await this.taskRepository.create(task);
    console.log(result);
    this.ashlandClient.emit('task_created', {
      id: result.id,
      title: result.title,
    });
    return result;
  }
}
