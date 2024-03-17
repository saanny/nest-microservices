import { IsString } from 'class-validator';
import { getOneTaskReq } from 'proto/taskManager';

export class GetOneTaskDto implements getOneTaskReq {
  @IsString()
  id: string;
}
