import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { MockUserRepository } from '../../infra/repository/user/mock';
import { RegisterUserController } from './user.controller';
import { RegisterUserService } from './user.service';

describe('UserController', () => {
  let controller: RegisterUserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterUserController],
      providers: [
        RegisterUserService,
        {
          provide: 'UserRepository',
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<RegisterUserController>(RegisterUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const response = await controller.execute({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(response).toBeUndefined();
  });
});
