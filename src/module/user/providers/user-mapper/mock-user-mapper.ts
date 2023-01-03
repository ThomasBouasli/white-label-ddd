import { Injectable } from '@nestjs/common';

import { User } from '@module/user/domain/user/user';

export type Entity = User;

export type Persistence = {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class MockUserMapper {
  public static toPersistence(user: Entity): Persistence {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toDomain(persistence: Persistence): Entity {
    const { id, name, email, password, emailVerified, createdAt, updatedAt } =
      persistence;

    return User.create(
      {
        name,
        email,
        password,
        emailVerified,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
