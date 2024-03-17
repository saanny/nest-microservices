import { IsOptional } from 'class-validator';
import { getAllTasksReq } from 'proto/taskManager';

export class GetAllTaskPaginationDto implements getAllTasksReq {
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  offset: number = 0;
}
