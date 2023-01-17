import { Test, TestingModule } from '@nestjs/testing';

import { MockUserMapper } from './providers/user/mock-user-mapper';
import { MockUserRepository } from './providers/user/mock-user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'UserRepository',
          useClass: MockUserRepository,
        },
        {
          provide: 'UserMapper',
          useClass: MockUserMapper,
        },
        UserService,
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
