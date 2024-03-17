import { Injectable } from '@nestjs/common';
import { TaskManager } from '../taskManager';
import { randomUUID } from 'crypto';

@Injectable()
export class TaskManagerFactory {
  create(data: {
    taskId?: string;
    title?: string;
    description?: string;
    parentId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    if (!data.taskId) {
      data.taskId = randomUUID();
    }
    if (!data.createdAt) {
      data.createdAt = new Date();
    }
    if (!data.updatedAt) {
      data.updatedAt = new Date();
    }
    return new TaskManager(
      data.taskId,
      data.parentId,
      data.title,
      data.description,
      data.createdAt,
      data.updatedAt,
    );
  }
}
