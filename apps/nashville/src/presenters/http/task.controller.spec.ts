import { Test, TestingModule } from '@nestjs/testing';
import { NashvilleController } from './task.controller';
import { NashvilleService } from '../../application/task.service';

describe('NashvilleController', () => {
  let nashvilleController: NashvilleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NashvilleController],
      providers: [NashvilleService],
    }).compile();

    nashvilleController = app.get<NashvilleController>(NashvilleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nashvilleController.getHello()).toBe('Hello World!');
    });
  });
});
