import { IsOptional, IsString } from 'class-validator';
import { updateTaskReq } from 'proto/taskManager';

export class UpdateOneTaskDto implements Omit<updateTaskReq, 'id'> {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description: string;
}
