import { Controller, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, GrpcMethod } from '@nestjs/microservices';
import { TaskService } from '../../application/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskCommand } from '../../application/commands/create-task.command';
import { CommandBus } from '@nestjs/cqrs';
import { TaskRepository } from '../../application/ports/task.repository';
import { TaskManagerFactory } from '../../domain/factories/taskManager.factory';

@Controller()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    @Inject('ASHLAND') private ashlandClient: ClientProxy,
    private readonly commandBus: CommandBus,
    private readonly taskRepository: TaskRepository,
    private readonly taskFactory: TaskManagerFactory,
  ) {}

  @GrpcMethod('TaskManager', 'createTask')
  async createTask(createTaskDto: CreateTaskDto) {
    const data = {
      id: 'test',
      title: 'test',
    };
    this.ashlandClient.emit('task_created', {
      data,
    });
    const task = this.taskFactory.create(
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.parentId,
    );
    
    const result = await this.taskRepository.create(task);
    console.log(result)
    return {
      success: true
    }
    // return await this.taskService.createTask(
    //   new CreateTaskCommand('sts', 'sdada', 'Adad'),
    // );

  
  }
}
