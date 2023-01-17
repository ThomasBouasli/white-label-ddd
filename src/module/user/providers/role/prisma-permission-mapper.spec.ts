import { Test, TestingModule } from '@nestjs/testing';
import { PrismaPermissionMapper } from './prisma-permission-mapper';

describe('PrismaPermissionMapper', () => {
  let provider: PrismaPermissionMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaPermissionMapper],
    }).compile();

    provider = module.get<PrismaPermissionMapper>(PrismaPermissionMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
