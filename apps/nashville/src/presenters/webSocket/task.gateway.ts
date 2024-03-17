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
  createTask(
    @MessageBody(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    body: CreateTaskDto,
  ) {
    return this.nashvilleService.createTask(body);
  }
  @SubscribeMessage('updateTask')
  updateTask(
    @MessageBody(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    body: UpdateOneTaskDto,
  ) {
    return this.nashvilleService.updateTask(body.id, {
      description: body.description,
      title: body.title,
    });
  }

  @SubscribeMessage('deleteTask')
  deleteTask(
    @MessageBody(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: DeleteOneTaskDto,
  ) {
    return this.nashvilleService.deleteOneTask(body.id);
  }
  @SubscribeMessage('getOneTask')
  getOneTask(
    @MessageBody(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: GetOneTaskDto,
  ) {
    return this.nashvilleService.getOneTask(body.id);
  }
  @SubscribeMessage('getAllTasks')
  getAllTasks(
    @MessageBody(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    body: GetAllTaskPaginationDto,
  ) {
    console.log(body);
    return this.nashvilleService.getAllTasks(body);
  }
}
