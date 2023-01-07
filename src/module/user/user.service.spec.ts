import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './domain/user/user';
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

  it('should register user', async () => {
    const data = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(service.registerCommonUser(data)).resolves.not.toThrow();
  });
});
