import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { TaskRepository } from '../ports/task.repository';
import { TaskManagerFactory } from '../../domain/factories/taskManager.factory';
import { Injectable, Logger } from '@nestjs/common';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  private readonly logger = new Logger(CreateTaskHandler.name);
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskFactory: TaskManagerFactory,
  ) {}

  async execute(command: CreateTaskCommand) {
    this.logger.debug(
      `Processing "CreateTaskCommand": ${JSON.stringify(command)}`,
    );

    const task = this.taskFactory.create(
      command.title,
      command.description,
      command.parentId,
    );
    
    return this.taskRepository.create(task);
  }
}
