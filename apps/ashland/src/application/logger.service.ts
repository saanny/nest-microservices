import { Injectable } from '@nestjs/common';

@Injectable()
export class AshlandService {
  taskCreated(data) {
    const message = `Task with ${data.id} and with title ${data.title} created`;
    console.log(message);
  }
  taskUpdated(data) {
    const message = `Task with ${data.id} and with title ${data.title} updated`;
    console.log(message);
  }
  taskDeleted(data) {
    const message = `Task with ${data.id} deleted`;
    console.log(message);
  }
}
