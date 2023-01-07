import { Injectable } from '@nestjs/common';

import { PrismaService } from '@application/infra/database/prisma';

import { User } from '@module/user/domain/user/user';

import { PrismaUserMapper } from '../user-mapper/prisma-user-mapper';
import { UserRepository } from './user-repository.interface';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPersistence(user);

    const createdUser = await this.prisma.user.create({ data });

    return PrismaUserMapper.toDomain(createdUser);
  }

  public async update(user: User): Promise<User> {
    const data = PrismaUserMapper.toPersistence(user);
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id.value },
      data,
    });
    return PrismaUserMapper.toDomain(updatedUser);
  }

  public async delete(user: User): Promise<void> {
    await this.prisma.user.delete({ where: { id: user.id.value } });
    return;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
