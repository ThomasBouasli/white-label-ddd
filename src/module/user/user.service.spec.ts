import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { RegisterUserDTO } from './dto';
import { MockUserMapper } from './providers/user/mock-user-mapper';
import { MockUserRepository } from './providers/user/mock-user-repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'UserMapper',
          useClass: MockUserMapper,
        },
        {
          provide: 'UserRepository',
          useClass: MockUserRepository,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user: RegisterUserDTO = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: faker.datatype.uuid(),
    };

    const createdUser = await service.register(user);

    expect(createdUser).toBeDefined();
  });

  it('should validate a user', async () => {
    const user: RegisterUserDTO = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: faker.datatype.uuid(),
    };

    await service.register(user);

    const validatedUser = await service.login({
      email: user.email,
      password: user.password,
    });

    expect(validatedUser).toBeDefined();
  });
});
