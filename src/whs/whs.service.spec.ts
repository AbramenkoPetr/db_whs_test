import { Test, TestingModule } from '@nestjs/testing';
import { WhsService } from './whs.service';

describe('WhsService', () => {
  let service: WhsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhsService],
    }).compile();

    service = module.get<WhsService>(WhsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
