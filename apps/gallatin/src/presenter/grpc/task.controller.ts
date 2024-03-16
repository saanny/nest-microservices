import { Controller, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, GrpcMethod } from '@nestjs/microservices';
import { TaskService } from '../../application/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskCommand } from '../../application/commands/create-task.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class TaskController {
  constructor(
    // private readonly taskService: TaskService,
    // @Inject('ASHLAND') private ashlandClient: ClientProxy,
    private readonly commandBus: CommandBus,
  ) {}

  @GrpcMethod('TaskManager', 'createTask')
  async createTask(createTaskDto: CreateTaskDto) {
    // const data = {
    //   id: 'test',
    //   title: 'test',
    // };
    // this.ashlandClient.emit('task_created', {
    //   data,
    // });

    this.commandBus.execute(new CreateTaskCommand('sts', 'sdada', 'Adad'));
    // return await this.taskService.createTask(
    //   new CreateTaskCommand('sts', 'sdada', 'Adad'),
    // );

    return {
      id: 'test',
    };
  }
}
