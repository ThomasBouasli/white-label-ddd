import { Injectable } from '@nestjs/common';

import { PrismaService } from '@application/infra/database/prisma';

import { DomainEvents } from '@shared/domain/events/DomainEvents';

import { User } from '@module/user/domain/User';

import { UserMapper } from '../../mapper/user/prisma';
import { UserRepository } from './interface';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    DomainEvents.dispatchEventsForAggregate(user.id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toEntity(user);
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toEntity(user);
  }
}
