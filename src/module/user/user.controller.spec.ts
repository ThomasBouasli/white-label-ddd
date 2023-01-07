import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { MockUserRepository } from './providers/user-repository/mock-user-repository';
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
        UserService,
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await controller.register({
      body: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    expect(result).toBeUndefined();
  });
});
