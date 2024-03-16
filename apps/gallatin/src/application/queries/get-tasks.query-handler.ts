// import { ICommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { CreateTaskCommand } from './create-task.command';
// import { TaskRepository } from '../ports/task.repository';
// import { TaskManagerFactory } from '../../domain/factories/tastManager.factory';
// import { GetTasksQuery } from './get-tasks.query';
// import { TaskManager } from '../../domain/taskManager';

// @QueryHandler(CreateTaskCommand)
// export class GetTasksCommandHandler
//   implements IQueryHandler<GetTasksQuery, TaskManager[]>
// {
//   constructor(
//     private readonly taskRepository: TaskRepository,
//     private taskFactory: TaskManagerFactory,
//   ) {}

//   async execute(query: GetTasksQuery) {
//     return [];
//   }
// }
