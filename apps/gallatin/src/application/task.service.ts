import { Injectable } from '@nestjs/common';
import { CreateTaskCommand } from './commands/create-task.command';
import { CommandBus } from '@nestjs/cqrs';
@Injectable()
export class TaskService {
  constructor(private readonly commandBus: CommandBus) {}
  createTask(command: CreateTaskCommand) {
    console.log(this.commandBus);
    return this.commandBus.execute(command);
  }
  updateTask() {}

  deleteOneTask() {}

  getAllTask() {}
  getOneTask() {}
}
