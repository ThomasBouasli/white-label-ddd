import { Test, TestingModule } from '@nestjs/testing';
import { PrismaRoleMapper } from './prisma-role-mapper';

describe('PrismaRoleMapper', () => {
  let provider: PrismaRoleMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaRoleMapper],
    }).compile();

    provider = module.get<PrismaRoleMapper>(PrismaRoleMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
