import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from '../presenters/http/dto/create-task.dto';
import {
  TASK_MANAGER_SERVICE_NAME,
  TaskManagerClient,
} from 'proto/taskManager';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import { UpdateOneTaskDto } from '../presenters/http/dto/update-task.dto';
import { DeleteOneTaskDto } from '../presenters/http/dto/delete-one-task.dto';
import { GetAllTaskPaginationDto } from '../presenters/http/dto/get-all-tasks.dto';
import { GetOneTaskDto } from '../presenters/http/dto/get-one-task.dto';

@Injectable()
export class NashvilleService implements OnModuleInit {
  private taskManager: TaskManagerClient;
  constructor(
    @Inject(TASK_MANAGER_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.taskManager = this.client.getService<TaskManagerClient>(
      TASK_MANAGER_SERVICE_NAME,
    );
  }
  async createTask(data: CreateTaskDto) {
    return this.taskManager.createTask(data).pipe(
      map((res) => {
        return res;
      }),
    );
  }
  async updateTask(data: UpdateOneTaskDto) {
    return this.taskManager.updateTask(data).pipe(
      map((res) => {
        return res;
      }),
    );
  }
  async getOneTask(data: GetOneTaskDto) {
    return this.taskManager.getOneTask(data).pipe(
      map((res) => {
        return res;
      }),
    );
  }
  async getAllTasks(data: GetAllTaskPaginationDto) {
    return this.taskManager.getAllTasks(data).pipe(
      map((res) => {
        return res;
      }),
    );
  }
  async deleteOneTask(data: DeleteOneTaskDto) {
    return this.taskManager.deleteTask(data).pipe(
      map((res) => {
        return res;
      }),
    );
  }
}
