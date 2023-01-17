import { Inject, Injectable } from '@nestjs/common';

import { User } from '@module/user/domain/user/user';

import { MockUserMapper, Persistence } from './mock-user-mapper';
import { UserRepository } from './user-repository.interface';

@Injectable()
export class MockUserRepository implements UserRepository {
  constructor(
    @Inject('UserMapper') private readonly userMapper: MockUserMapper,
  ) {}

  public users: Persistence[] = [];

  async create(user: User): Promise<User> {
    const persistence = this.userMapper.toPersistence(user);
    this.users.push(persistence);
    return this.userMapper.toDomain(persistence);
  }

  async update(user: User): Promise<User> {
    const persistence = this.userMapper.toPersistence(user);
    const index = this.users.findIndex((u) => u.id === persistence.id);
    this.users[index] = persistence;
    return this.userMapper.toDomain(persistence);
  }

  async delete(user: User): Promise<User> {
    const persistence = this.userMapper.toPersistence(user);
    const index = this.users.findIndex((u) => u.id === persistence.id);
    this.users.splice(index, 1);
    return this.userMapper.toDomain(persistence);
  }

  async findOneByEmail(email: string): Promise<User> {
    const persistence = this.users.find((u) => u.email === email);
    return this.userMapper.toDomain(persistence);
  }

  async findOneById(id: string): Promise<User> {
    const persistence = this.users.find((u) => u.id === id);
    return this.userMapper.toDomain(persistence);
  }
}
