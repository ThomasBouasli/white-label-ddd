import { Test, TestingModule } from '@nestjs/testing';

import { MockPermissionMapper } from './mock-permission-mapper';

describe('MockPermissionMapper', () => {
  let provider: MockPermissionMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockPermissionMapper],
    }).compile();

    provider = module.get<MockPermissionMapper>(MockPermissionMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
