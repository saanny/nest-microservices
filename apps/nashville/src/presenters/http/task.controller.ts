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
import { NashvilleService } from '../../application/task.service';
import { UpdateOneTaskDto } from './dto/update-task.dto';
import { GetAllTaskPaginationDto } from './dto/get-all-tasks.dto';
import { GetOneTaskDto } from './dto/get-one-task.dto';
import { DeleteOneTaskDto } from './dto/delete-one-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller()
export class NashvilleController {
  constructor(private readonly nashvilleService: NashvilleService) {}

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.nashvilleService.createTask(body);
  }
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: UpdateOneTaskDto) {
    return this.nashvilleService.updateTask({
      id,
      ...body,
    });
  }
  @Get()
  getAllTasks(@Query() pagination: GetAllTaskPaginationDto) {
    return this.nashvilleService.getAllTasks(pagination);
  }
  @Get(':id')
  getOneTask(@Param('id') id: GetOneTaskDto) {
    return this.nashvilleService.getOneTask(id);
  }
  @Delete('id')
  deleteOneTask(@Param('id') id: DeleteOneTaskDto) {
    return this.nashvilleService.deleteOneTask(id);
  }
}
