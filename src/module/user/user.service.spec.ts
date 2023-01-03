import { Test, TestingModule } from '@nestjs/testing';

import { MockUserMapper } from './providers/user-mapper/mock-user-mapper';
import { MockUserRepository } from './providers/user-repository/mock-user-repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: MockUserRepository,
        },
        MockUserMapper,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
