import { Test, TestingModule } from '@nestjs/testing';
import { PubFeedService } from './pub-feed.service';

describe('PubFeedService', () => {
  let service: PubFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubFeedService],
    }).compile();

    service = module.get<PubFeedService>(PubFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
