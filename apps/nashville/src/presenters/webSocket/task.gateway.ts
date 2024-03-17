import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateTaskDto } from '../http/dto/create-task.dto';
import { ValidationPipe } from '@nestjs/common';
import { NashvilleService } from '../../application/task.service';
import { UpdateOneTaskDto } from './dto/update-task.dto';
import { DeleteOneTaskDto } from './dto/delete-one-task.dto';
import { GetOneTaskDto } from './dto/get-one-task.dto';
import { GetAllTaskPaginationDto } from './dto/get-all-tasks.dto';
@WebSocketGateway()
export class TaskManagerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly nashvilleService: NashvilleService) {}

  private clients: Set<Socket> = new Set();

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }
  @SubscribeMessage('createTask')
  async createTask(
    @MessageBody(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: CreateTaskDto,
  ) {
    const result = await this.nashvilleService.createTask(body);
    this.server.emit('onCreateTask', result);
  }
  @SubscribeMessage('updateTask')
  async updateTask(
    @MessageBody(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: UpdateOneTaskDto,
  ) {
    const result = await this.nashvilleService.updateTask(body);
    this.server.emit('onUpdateTask', result);
  }

  @SubscribeMessage('deleteTask')
  async deleteTask(
    @MessageBody(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: DeleteOneTaskDto,
  ) {
    const result = await this.nashvilleService.deleteOneTask(body);
    this.server.emit('onDeleteTask', result);
  }
  @SubscribeMessage('getOneTask')
  async getOneTask(
    @MessageBody(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: GetOneTaskDto,
  ) {
    const result = await this.nashvilleService.getOneTask(body);
    this.server.emit('onGetOneTask', result);
  }
  @SubscribeMessage('getAllTasks')
  async getAllTasks(
    @MessageBody(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: GetAllTaskPaginationDto,
  ) {
    const result = await this.nashvilleService.getAllTasks(body);
    this.server.emit('onGetAllTasks', result);
  }
}
