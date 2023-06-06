import { Test, TestingModule } from '@nestjs/testing';
import { GtsService } from './gts.service';

describe('GtsService', () => {
  let service: GtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GtsService],
    }).compile();

    service = module.get<GtsService>(GtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
