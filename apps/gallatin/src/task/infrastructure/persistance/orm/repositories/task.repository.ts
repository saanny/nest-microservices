import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../task.entity';
import { Repository } from 'typeorm';

import { TaskMapper } from '../maper/task.mapper';
import {
  FindAllTasksFilters,
  GetAllResponse,
  TaskRepository,
  UpdateData,
} from 'apps/gallatin/src/task/application/ports/task.repository';
import { TaskManager } from 'apps/gallatin/src/task/domain/taskManager';
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

    if (!persistenceModel.parentId) {
      delete persistenceModel.parentId;
    }

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
      relations: ['parentId', 'children'],
      skip: Number(offset),
      take: Number(limit),
    });

    return {
      total: result[1] ?? 0,
      pageSize: Number(limit),
      tasks: result[0].map((item) => TaskMapper.toDomain(item)),
    };
  }
  async getOne(id: string): Promise<TaskManager> {
    const result = await this.taskRepository.findOne({
      where: {
        id: id,
      },
      relations: ['parentId', 'children'],
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
  async updateOne(id: string, data: UpdateData): Promise<TaskManager> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id: id },
      });

      if (!task) throw new NotFoundException(`Task #${id} not found`);

      const parent = await this.taskRepository.findOne({
        where: {
          id: data.parentId,
        },
      });
      Object.assign(task, { ...data, parent });
      const updatedEntity = await this.taskRepository.save(task);
      return TaskMapper.toDomain(updatedEntity);
    } catch (error) {
      console.log(error);
    }
  }
}
