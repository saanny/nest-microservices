import { TaskManager } from 'apps/gallatin/src/domain/taskManager';
import { TaskEntity } from '../task.entity';

export class TaskMapper {
  static toDomain(taskEntity: TaskEntity): TaskManager {
    const taskModel = new TaskManager(
      taskEntity.id,
      taskEntity.parentId ? taskEntity.parentId.id : null,
      taskEntity.title,
      taskEntity.description,
      taskEntity.createdAt,
      taskEntity.updatedAt,
    );
    return taskModel;
  }

  static toPersistence(task: TaskManager, parentTask?: TaskEntity): TaskEntity {
    const entity = new TaskEntity();
    entity.id = task.id;
    entity.parentId = parentTask || null;
    entity.title = task.title;
    entity.description = task.description;
    entity.createdAt = task.createdAt;
    entity.updatedAt = task.updatedAt;
    return entity;
  }
}
