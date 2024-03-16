/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "taskManager";

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface updateTaskReq {
  id: string;
}

export interface updateTaskReq_data {
  title: string;
  description: string;
}

export interface updateTaskResp {
  success: boolean;
}

export interface deleteOneTaskReq {
  id: string;
}

export interface deleteOneTaskResp {
  success: boolean;
}

export interface getOneTaskReq {
  id: string;
}

export interface getOneTaskResp {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface getAllTasksReq {
  limit: number;
  offset: number;
}

export interface getAllTasksResp {
  tasks: Task[];
  pageSize: number;
  total: number;
}

export interface createTaskReq {
  parentId?: string | undefined;
  title: string;
  description: string;
}

export interface createTaskResponse {
  success: boolean;
}

export const TASK_MANAGER_PACKAGE_NAME = "taskManager";

export interface TaskManagerClient {
  createTask(request: createTaskReq): Observable<createTaskResponse>;

  updateTask(request: updateTaskReq): Observable<updateTaskResp>;

  deleteTask(request: deleteOneTaskReq): Observable<deleteOneTaskResp>;

  getOneTask(request: getOneTaskReq): Observable<getOneTaskResp>;

  getAllTasks(request: getAllTasksReq): Observable<getAllTasksResp>;
}

export interface TaskManagerController {
  createTask(request: createTaskReq): Promise<createTaskResponse> | Observable<createTaskResponse> | createTaskResponse;

  updateTask(request: updateTaskReq): Promise<updateTaskResp> | Observable<updateTaskResp> | updateTaskResp;

  deleteTask(request: deleteOneTaskReq): Promise<deleteOneTaskResp> | Observable<deleteOneTaskResp> | deleteOneTaskResp;

  getOneTask(request: getOneTaskReq): Promise<getOneTaskResp> | Observable<getOneTaskResp> | getOneTaskResp;

  getAllTasks(request: getAllTasksReq): Promise<getAllTasksResp> | Observable<getAllTasksResp> | getAllTasksResp;
}

export function TaskManagerControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTask", "updateTask", "deleteTask", "getOneTask", "getAllTasks"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TaskManager", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TaskManager", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASK_MANAGER_SERVICE_NAME = "TaskManager";
