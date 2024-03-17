import { Test, TestingModule } from '@nestjs/testing';
import { HttpTaskController } from './task.controller';
import { TaskService } from '../../application/task.service';

describe('HtppTaskController', () => {
  let httpController: HttpTaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HttpTaskController],
      providers: [TaskService],
    }).compile();

    httpController = app.get<HttpTaskController>(HttpTaskController);
  });

  describe('root', () => {
    it('should create task"', () => {
      expect(
        httpController.createTask({
          description: 'test',
          title: 'test',
        }),
      ).toMatchObject({
        success: true,
      });
    });
  });
});
