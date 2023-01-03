import { Injectable } from '@nestjs/common';

import { User } from '@module/user/domain/user/user';

import { MockUserMapper, Persistence } from '../user-mapper/mock-user-mapper';
import { UserRepository } from './user-repository.interface';

@Injectable()
export class MockUserRepository implements UserRepository {
  private users: Persistence[] = [];

  public async create(user: User): Promise<User> {
    const persistence = MockUserMapper.toPersistence(user);

    this.users.push(persistence);

    return user;
  }

  public async update(user: User): Promise<User> {
    const index = this.users.findIndex((item) => item.id === user.id.value);

    this.users[index] = MockUserMapper.toPersistence(user);

    return user;
  }

  public async delete(user: User): Promise<void> {
    const index = this.users.findIndex((item) => item.id === user.id.value);

    this.users.splice(index, 1);

    return;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const persistence = this.users.find((item) => item.email === email);

    if (!persistence) {
      return null;
    }

    return MockUserMapper.toDomain(persistence);
  }

  public async findById(id: string): Promise<User | null> {
    const persistence = this.users.find((item) => item.id === id);

    if (!persistence) {
      return null;
    }

    return MockUserMapper.toDomain(persistence);
  }
}
