import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from '../presenters/http/dto/create-task.dto';
import {
  TASK_MANAGER_SERVICE_NAME,
  TaskManagerClient,
} from 'proto/taskManager';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import { UpdateOneTaskDto } from '../presenters/http/dto/update-task.dto';
import { GetAllTaskPaginationDto } from '../presenters/http/dto/get-all-tasks.dto';

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
  async updateTask(id: string, data: UpdateOneTaskDto) {
    return this.taskManager
      .updateTask({
        ...data,
        id,
      })
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }
  async getOneTask(id: string) {
    return this.taskManager
      .getOneTask({
        id,
      })
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }
  async getAllTasks(data: GetAllTaskPaginationDto) {
    return this.taskManager.getAllTasks(data).pipe(
      map((res) => {
        return {
          ...res,
          pageSize: Number(res.pageSize),
          total: Number(res.total),
        };
      }),
    );
  }
  async deleteOneTask(id: string) {
    return this.taskManager
      .deleteTask({
        id,
      })
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }
}
