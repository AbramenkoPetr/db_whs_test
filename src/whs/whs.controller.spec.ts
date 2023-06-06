import { Test, TestingModule } from '@nestjs/testing';
import { WhsController } from './whs.controller';

describe('WhsController', () => {
  let controller: WhsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhsController],
    }).compile();

    controller = module.get<WhsController>(WhsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
