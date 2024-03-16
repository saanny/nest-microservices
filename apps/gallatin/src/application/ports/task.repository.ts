import { TaskManager } from '../../domain/taskManager';

export interface GetAllResponse {
  total: number;
  pageSize: number;
  data: TaskManager[];
}
export interface FindAllTasksFilters {
  limit: number;
  offset: number;
}
export interface UpdateData {
  title: string;
  description: string;
  parentId: string;
}
export abstract class TaskRepository {
  abstract create(task: TaskManager): Promise<TaskManager>;
  abstract getAll(
    findAllTasksFilters: FindAllTasksFilters,
  ): Promise<GetAllResponse>;
  abstract getOne(id: string): Promise<TaskManager>;
  abstract deleteOne(id: string): Promise<boolean>;
  abstract updateOne(id: string, data: UpdateData): Promise<boolean>;
}
