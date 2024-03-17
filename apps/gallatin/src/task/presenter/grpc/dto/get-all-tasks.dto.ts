import { IsNumber } from 'class-validator';
import { getAllTasksReq } from 'proto/taskManager';

export class GetAllTaskPaginationDto implements getAllTasksReq {
  @IsNumber()
  limit: number;
  @IsNumber()
  offset: number;
}
