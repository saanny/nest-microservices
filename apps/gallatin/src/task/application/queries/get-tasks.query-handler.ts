import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllResponse, TaskRepository } from '../ports/task.repository';
import { GetTasksQuery } from './get-tasks.query';
import { Logger } from '@nestjs/common';

@QueryHandler(GetTasksQuery)
export class GetAllTasksHandler
  implements IQueryHandler<GetTasksQuery, GetAllResponse>
{
  private readonly logger = new Logger(GetAllTasksHandler.name);
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTasksQuery) {
    this.logger.debug(`Processing "GetTaskQuery": ${JSON.stringify(query)}`);

    const result = await this.taskRepository.getAll(query);
    console.log(result);
    return result;
  }
}
