import { IsString } from 'class-validator';
import { deleteOneTaskReq } from 'proto/taskManager';

export class DeleteOneTaskDto implements deleteOneTaskReq {
  @IsString()
  id: string;
}
