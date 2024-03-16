import { Test, TestingModule } from '@nestjs/testing';
import { AshlandController } from './ashland.controller';
import { AshlandService } from './ashland.service';

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
