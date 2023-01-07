import { Injectable } from '@nestjs/common';
import { User as Persistence } from '@prisma/client';

import { User as Entity } from '@module/user/domain/user/user';
import { UserRoleType } from '@module/user/domain/user/user-role';

@Injectable()
export class PrismaUserMapper {
  public static toPersistence(user: Entity): Persistence {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      emailVerified: user.emailVerified,
      password: user.password.value,
      role: user.role.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toDomain(persistence: Persistence): Entity {
    return Entity.create(
      {
        name: persistence.name,
        email: persistence.email,
        emailVerified: persistence.emailVerified,
        password: persistence.password,
        role: persistence.role as UserRoleType,
        createdAt: persistence.createdAt,
        updatedAt: persistence.updatedAt,
      },
      persistence.id,
    );
  }
}
