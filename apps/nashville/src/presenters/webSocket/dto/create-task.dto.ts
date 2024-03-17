import { IsOptional, IsString } from 'class-validator';
import { createTaskReq } from 'proto/taskManager';

export class CreateTaskDto implements createTaskReq {
  @IsString()
  @IsOptional()
  parentId?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
