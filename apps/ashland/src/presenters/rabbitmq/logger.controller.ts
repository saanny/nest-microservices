import { Controller } from '@nestjs/common';
import { AshlandService } from '../../application/logger.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatedTaskDto } from './dto/create-task.dto';
import { UpdatedTaskDto } from './dto/update-task.dto';
import { DeletedTaskDto } from './dto/deleted-task.dto';

@Controller()
export class AshlandController {
  constructor(private readonly ashlandService: AshlandService) {}

  @MessagePattern('task_created')
  createTask(@Payload() data: CreatedTaskDto) {
    this.ashlandService.taskCreated(data);
  }
  @MessagePattern('task_updated')
  taskUpdated(@Payload() data: UpdatedTaskDto) {
    this.ashlandService.taskUpdated(data);
  }
  @MessagePattern('task_deleted')
  taskDeleted(@Payload() data: DeletedTaskDto) {
    this.ashlandService.taskDeleted(data);
  }
}
