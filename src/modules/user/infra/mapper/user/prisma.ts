import { User } from '@prisma/client';

import { User as Entity } from '../../../domain/User';

export type Persistence = User;

export class UserMapper {
  public static toPersistence(entity: Entity): Persistence {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email,
      password: entity.password.value,
      emailVerified: entity.emailVerified,
    };
  }

  public static toEntity(persistence: Persistence): Entity {
    return Entity.create(
      {
        name: persistence.name,
        email: persistence.email,
        password: persistence.password,
        emailVerified: persistence.emailVerified,
      },
      persistence.id,
    );
  }
}
