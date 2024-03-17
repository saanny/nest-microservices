import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateOneTaskDto } from './dto/update-task.dto';
import { DeleteOneTaskDto } from './dto/delete-one-task.dto';
import { GetAllTaskPaginationDto } from './dto/get-all-tasks.dto';
import { TaskService } from '../../application/task.service';
import { GetOneTaskDto } from './dto/get-one-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskManager', 'createTask')
  async createTask(createTaskDto: CreateTaskDto) {
    const result = await this.taskService.createTask(createTaskDto);

    return result;
  }
  @GrpcMethod('TaskManager', 'updateTask')
  async updateTask(updateTaskDto: UpdateOneTaskDto) {
    return await this.taskService.updateTask(updateTaskDto);
  }
  @GrpcMethod('TaskManager', 'deleteTask')
  async deleteTask(deleteTaskDto: DeleteOneTaskDto) {
    return await this.taskService.deleteOneTask(deleteTaskDto);
  }

  @GrpcMethod('TaskManager', 'getAllTasks')
  async getAllTasks(getAllTasksDto: GetAllTaskPaginationDto) {
    return await this.taskService.getAllTask(getAllTasksDto);
  }
  @GrpcMethod('TaskManager', 'getOneTask')
  async getOneTask(getOneTaskDto: GetOneTaskDto) {
    return await this.taskService.getOneTask(getOneTaskDto);
  }
}
