import { Test, TestingModule } from '@nestjs/testing';

import { PrismaUserMapper } from './prisma-user-mapper';

describe('PrismaUserMapper', () => {
  let provider: PrismaUserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaUserMapper],
    }).compile();

    provider = module.get<PrismaUserMapper>(PrismaUserMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
