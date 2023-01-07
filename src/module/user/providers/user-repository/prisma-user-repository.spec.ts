import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@application/infra/database/prisma';

import { PrismaUserRepository } from './prisma-user-repository';

describe('PrismaUserRepository', () => {
  let provider: PrismaUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaUserRepository, PrismaService],
    }).compile();

    provider = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
