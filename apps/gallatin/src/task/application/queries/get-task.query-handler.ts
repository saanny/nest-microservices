import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskRepository } from '../ports/task.repository';
import { Logger } from '@nestjs/common';
import { GetOneTaskQuery } from './get-one-tasks.';
import { TaskManager } from '../../domain/taskManager';

@QueryHandler(GetOneTaskQuery)
export class GetOneTaskHandler
  implements IQueryHandler<GetOneTaskQuery, TaskManager>
{
  private readonly logger = new Logger(GetOneTaskHandler.name);
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetOneTaskQuery) {
    this.logger.debug(`Processing "GetOneTask": ${JSON.stringify(query)}`);

    const result = await this.taskRepository.getOne(query.id);
    console.log(result);
    return result;
  }
}
