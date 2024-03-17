import { Controller } from '@nestjs/common';
import { AshlandService } from '../../application/logger.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AshlandController {
  constructor(private readonly ashlandService: AshlandService) {}

  @MessagePattern('task_created')
  createTask(@Payload() data) {
    this.ashlandService.taskCreated(data);
  }
  @MessagePattern('task_updated')
  taskUpdated(@Payload() data) {
    this.ashlandService.taskUpdated(data);
  }
  @MessagePattern('task_deleted')
  taskDeleted(@Payload() data) {
    this.ashlandService.taskDeleted(data);
  }
}
