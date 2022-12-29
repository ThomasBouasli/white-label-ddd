import { DomainEvents } from '@shared/domain/events/DomainEvents';

import { User } from '../../../domain/User';
import { UserRepository } from './interface';

export class MockUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    if (this.users.find((u) => u.email === user.email)) {
      throw new Error('Email already in use');
    }

    this.users.push(user);

    DomainEvents.dispatchEventsForAggregate(user.id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id.value === id);
  }
}
