import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from '../../application/task.service';
import { UpdateOneTaskDto } from './dto/update-task.dto';
import { GetAllTaskPaginationDto } from './dto/get-all-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller()
export class HttpTaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: UpdateOneTaskDto) {
    return this.taskService.updateTask(id, body);
  }
  @Get()
  getAllTasks(@Query() pagination: GetAllTaskPaginationDto) {
    return this.taskService.getAllTasks(pagination);
  }
  @Get(':id')
  getOneTask(@Param('id') id: string) {
    return this.taskService.getOneTask(id);
  }
  @Delete(':id')
  deleteOneTask(@Param('id') id: string) {
    return this.taskService.deleteOneTask(id);
  }
}
