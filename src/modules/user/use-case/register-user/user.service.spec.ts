import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { MockUserRepository } from '../../infra/repository/user/mock';
import { RegisterUserRequest } from './DTO';
import { RegisterUserService } from './user.service';

describe('UserService', () => {
  let service: RegisterUserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserService,
        {
          provide: 'UserRepository',
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<RegisterUserService>(RegisterUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const request: RegisterUserRequest = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await service.execute(request);

    expect(response).toBeUndefined();
  });
});
