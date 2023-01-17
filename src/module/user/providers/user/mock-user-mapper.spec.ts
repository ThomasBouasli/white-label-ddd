import { Test, TestingModule } from '@nestjs/testing';

import { MockUserMapper } from './mock-user-mapper';

describe('MockUserMapper', () => {
  let provider: MockUserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockUserMapper],
    }).compile();

    provider = module.get<MockUserMapper>(MockUserMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
