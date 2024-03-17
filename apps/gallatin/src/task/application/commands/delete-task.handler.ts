import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from '../ports/task.repository';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DeleteTaskCommand } from './delete-task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  private readonly logger = new Logger(DeleteTaskHandler.name);
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject('ASHLAND') private ashlandClient: ClientProxy,
  ) {}

  async execute(command: DeleteTaskCommand) {
    this.logger.debug(
      `Processing "DeleteTaskCommand": ${JSON.stringify(command)}`,
    );

    const result = await this.taskRepository.deleteOne(command.id);
    this.ashlandClient.emit('task_deleted', {
      id: command.id,
    });
    return result;
  }
}
