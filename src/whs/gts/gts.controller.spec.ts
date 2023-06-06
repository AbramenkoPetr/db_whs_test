import { Test, TestingModule } from '@nestjs/testing';
import { GtsController } from './gts.controller';

describe('GtsController', () => {
  let controller: GtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GtsController],
    }).compile();

    controller = module.get<GtsController>(GtsController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
