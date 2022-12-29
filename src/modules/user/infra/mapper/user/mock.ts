import { User } from '../../../domain/User';

export type Entity = User;

export type Persistence = {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
};

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
    return User.create(
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
