import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@module/user/domain/user/user';

import { MockUserMapper } from './mock-user-mapper';

describe('MockUserMapper', () => {
  let provider: MockUserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockUserMapper],
    }).compile();

    provider = module.get<MockUserMapper>(MockUserMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should be able to map to persistence', () => {
    const user = User.create({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'COMMON',
    });

    const persistence = MockUserMapper.toPersistence(user);

    expect(persistence).toBeDefined();
  });

  it('should be able to map to domain', () => {
    const persistence = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      emailVerified: faker.datatype.boolean(),
      role: 'COMMON',
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    const user = MockUserMapper.toDomain(persistence);

    expect(user).toBeDefined();
  });
});
