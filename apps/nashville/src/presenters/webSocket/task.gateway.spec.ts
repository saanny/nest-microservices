import { Test, TestingModule } from '@nestjs/testing';
import { TaskManagerGateway } from './task.gateway';

describe('TaskManagerGateway', () => {
  let gateway: TaskManagerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskManagerGateway],
    }).compile();

    gateway = module.get<TaskManagerGateway>(TaskManagerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
