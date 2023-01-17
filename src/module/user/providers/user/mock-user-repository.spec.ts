import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@module/user/domain/user/user';

import { MockUserMapper } from './mock-user-mapper';
import { MockUserRepository } from './mock-user-repository';

describe('MockUserRepository', () => {
  let provider: MockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'UserMapper',
          useClass: MockUserMapper,
        },
        MockUserRepository,
      ],
    }).compile();

    provider = module.get<MockUserRepository>(MockUserRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should create a user', async () => {
    const user = User.create({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: faker.datatype.uuid(),
    });

    const createdUser = await provider.create(user);

    expect(createdUser).toBeDefined();
    expect(provider.users).toHaveLength(1);
  });
});
