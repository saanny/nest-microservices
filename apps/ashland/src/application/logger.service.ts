import { Injectable } from '@nestjs/common';
import { CreatedTaskDto } from '../presenters/rabbitmq/dto/create-task.dto';
import { UpdatedTaskDto } from '../presenters/rabbitmq/dto/update-task.dto';
import { DeletedTaskDto } from '../presenters/rabbitmq/dto/deleted-task.dto';

@Injectable()
export class AshlandService {
  taskCreated(data: CreatedTaskDto) {
    const message = `Task with ${data.id} and with title ${data.title} created`;
    console.log(message);
  }
  taskUpdated(data: UpdatedTaskDto) {
    const message = `Task with ${data.id} and with title ${data.title} updated`;
    console.log(message);
  }
  taskDeleted(data: DeletedTaskDto) {
    const message = `Task with ${data.id} deleted`;
    console.log(message);
  }
}
