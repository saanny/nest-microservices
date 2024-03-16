import { Controller } from '@nestjs/common';
import { AshlandService } from './ashland.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AshlandController {
  constructor(private readonly ashlandService: AshlandService) {}

  @MessagePattern('task_created')
  createTask(@Payload() data, @Ctx() context: RmqContext) {
    this.ashlandService.taskCreated(data.data);
  }
  @MessagePattern('task_updated')
  taskUpdated(@Payload() data, @Ctx() context: RmqContext) {
    this.ashlandService.taskUpdated(data.data);
  }
  @MessagePattern('task_deleted')
  taskDeleted(@Payload() data, @Ctx() context: RmqContext) {
    this.ashlandService.taskDeleted(data.data);
  }
}
