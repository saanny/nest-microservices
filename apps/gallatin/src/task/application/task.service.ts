import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskDto } from '../presenter/grpc/dto/create-task.dto';
import { UpdateOneTaskDto } from '../presenter/grpc/dto/update-task.dto';
import { DeleteOneTaskDto } from '../presenter/grpc/dto/delete-one-task.dto';
import { GetAllTaskPaginationDto } from '../presenter/grpc/dto/get-all-tasks.dto';
import { GetOneTaskDto } from '../presenter/grpc/dto/get-one-task.dto';
import { CreateTaskCommand } from './commands/create-task.command';
import { CreateTaskHandler } from './commands/create-task.handler';
import { UpdateTaskHandler } from './commands/update-task.handler';
import { UpdateTaskCommand } from './commands/update-task.command';
import { DeleteTaskCommand } from './commands/delete-task.command';
import { DeleteTaskHandler } from './commands/delete-task.handler';
import { GetTasksQuery } from './queries/get-tasks.query';
import { GetAllTasksHandler } from './queries/get-tasks.query-handler';
import { GetOneTaskHandler } from './queries/get-task.query-handler';
import { GetOneTaskQuery } from './queries/get-one-tasks.';

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async createTask(createTaskDto: CreateTaskDto) {
    try {
      this.commandBus.register([CreateTaskHandler]);
      await this.commandBus.execute(
        new CreateTaskCommand(
          createTaskDto.title,
          createTaskDto.description,
          createTaskDto.parentId,
        ),
      );
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }
  async updateTask(updateTaskDto: UpdateOneTaskDto) {
    try {
      this.commandBus.register([UpdateTaskHandler]);
      await this.commandBus.execute(
        new UpdateTaskCommand(
          updateTaskDto.id,
          updateTaskDto.title,
          updateTaskDto.description,
          updateTaskDto.parentId,
        ),
      );
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  async deleteOneTask(deleteTaskDto: DeleteOneTaskDto) {
    try {
      this.commandBus.register([DeleteTaskHandler]);
      await this.commandBus.execute(new DeleteTaskCommand(deleteTaskDto.id));
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  async getAllTask(getAllTaskDto: GetAllTaskPaginationDto) {
    try {
      this.queryBus.register([GetAllTasksHandler]);
      const result = await this.queryBus.execute(
        new GetTasksQuery(getAllTaskDto.limit, getAllTaskDto.offset),
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getOneTask(getOneTaskDto: GetOneTaskDto) {
    try {
      this.queryBus.register([GetOneTaskHandler]);
      const result = await this.queryBus.execute(
        new GetOneTaskQuery(getOneTaskDto.id),
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
