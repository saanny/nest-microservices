import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '../ports/task.repository';
import { TaskManagerFactory } from '../../domain/factories/taskManager.factory';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateTaskCommand } from './update-task.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  private readonly logger = new Logger(UpdateTaskHandler.name);
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskFactory: TaskManagerFactory,
    @Inject('ASHLAND') private ashlandClient: ClientProxy,
  ) {}

  async execute(command: UpdateTaskCommand) {
    this.logger.debug(
      `Processing "UpdateTaskCommand": ${JSON.stringify(command)}`,
    );

    const task = this.taskFactory.create({
      title: command.title,
      description: command.description,
      parentId: command.parentId,
      taskId: command.id,
    });
    const result = await this.taskRepository.updateOne(task.id, {
      title: task.title,
      description: task.description,
      parentId: task.parentId,
    });
    console.log(result);
    this.ashlandClient.emit('task_updated', {
      id: result.id,
      title: result.title,
    });
    return result;
  }
}
