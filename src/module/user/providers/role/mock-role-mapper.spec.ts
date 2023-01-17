import { Test, TestingModule } from '@nestjs/testing';

import { MockPermissionMapper } from './mock-permission-mapper';
import { MockRoleMapper } from './mock-role-mapper';

describe('MockRoleMapper', () => {
  let provider: MockRoleMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PermissionMapper',
          useClass: MockPermissionMapper,
        },
        MockRoleMapper,
      ],
    }).compile();

    provider = module.get<MockRoleMapper>(MockRoleMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
