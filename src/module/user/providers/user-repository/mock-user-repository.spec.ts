import { Test, TestingModule } from '@nestjs/testing';

import { MockUserMapper } from '../user-mapper/mock-user-mapper';
import { MockUserRepository } from './mock-user-repository';

describe('MockUserRepository', () => {
  let provider: MockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockUserRepository, MockUserMapper],
    }).compile();

    provider = module.get<MockUserRepository>(MockUserRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
