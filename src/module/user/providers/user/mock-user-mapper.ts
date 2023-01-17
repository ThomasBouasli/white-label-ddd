import { Injectable } from '@nestjs/common';

import { User } from '@module/user/domain/user/user';

import { UserMapper } from './user-mapper.interface';

export interface Persistence {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MockUserMapper implements UserMapper<Persistence> {
  toDomain(persistence: Persistence): User {
    return User.create(
      {
        name: persistence.name,
        email: persistence.email,
        password: persistence.password,
        roleId: persistence.roleId,
        emailVerified: persistence.emailVerified,
        createdAt: persistence.createdAt,
        updatedAt: persistence.updatedAt,
      },
      persistence.id,
    );
  }

  toPersistence(user: User): Persistence {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      emailVerified: user.emailVerified,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
