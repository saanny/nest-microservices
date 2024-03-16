import { Injectable } from '@nestjs/common';
import { TaskManager } from '../taskManager';
import { randomUUID } from 'crypto';

@Injectable()
export class TaskManagerFactory {
  create(title: string, description: string, parentId?: string) {
    const taskId = randomUUID();

    return new TaskManager(
      taskId,
      parentId,
      title,
      description,
      new Date(),
      new Date(),
    );
  }
}
