import { IsOptional, IsString } from 'class-validator';
import { updateTaskReq } from 'proto/taskManager';

export class UpdateOneTaskDto implements updateTaskReq {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description: string;
}
