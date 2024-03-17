import { Test, TestingModule } from '@nestjs/testing';
import { AshlandController } from './logger.controller';
import { AshlandService } from '../../application/logger.service';

describe('AshlandController', () => {
  let ashlandController: AshlandController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AshlandController],
      providers: [AshlandService],
    }).compile();

    ashlandController = app.get<AshlandController>(AshlandController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ashlandController.getHello()).toBe('Hello World!');
    });
  });
});
