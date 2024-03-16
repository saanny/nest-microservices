import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FindAllTasksFilters,
  GetAllResponse,
  TaskRepository,
  UpdateData,
} from 'apps/gallatin/src/application/ports/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../task.entity';
import { Repository } from 'typeorm';
import { TaskManager } from 'apps/gallatin/src/domain/taskManager';
import { TaskMapper } from '../maper/task.mapper';
@Injectable()
export class OrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async create(task: TaskManager): Promise<TaskManager> {
    let parent;
    if (task.parentId) {
      parent = await this.getOne(task.parentId);
      parent = TaskMapper.toPersistence(parent);
    }
    const persistenceModel = TaskMapper.toPersistence(task, parent);
    const newEntity = await this.taskRepository.save(persistenceModel);
    return TaskMapper.toDomain(newEntity);
  }
  async getAll(
    findAllTasksFilters: FindAllTasksFilters,
  ): Promise<GetAllResponse> {
    const { limit, offset } = findAllTasksFilters;

    const result = await this.taskRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      relations: ['parent'],
      skip: offset,
      take: limit,
    });

    return {
      total: result[1] ?? 0,
      pageSize: limit,
      data: result[0].map((item) => TaskMapper.toDomain(item)),
    };
  }
  async getOne(id: string): Promise<TaskManager> {
    const result = await this.taskRepository.findOne({
      where: {
        id: id,
      },
      relations: ['parent'],
    });

    return TaskMapper.toDomain(result);
  }
  async deleteOne(id: string): Promise<boolean> {
    try {
      const task = await this.getOne(id);
      await this.taskRepository.remove(TaskMapper.toPersistence(task));
      return true;
    } catch (error) {
      return false;
      console.log(error);
    }
  }
  async updateOne(id: string, data: UpdateData): Promise<boolean> {
    try {
      const category = await this.taskRepository.findOne({
        where: { id: id },
      });

      if (!category) throw new NotFoundException(`Task #${id} not found`);

      const parent = await this.taskRepository.findOne({
        where: {
          id: data.parentId,
        },
      });
      Object.assign(category, { ...data, parent });
      await this.taskRepository.save(category);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
