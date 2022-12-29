import { AggregateRoot } from '@shared/domain/AggregateRoot';

import { UserPassword } from './UserPassword';
import { UserCreated } from './events/UserCreated';

export type UserProps = {
  name: string;
  email: string;
  password: UserPassword;
  emailVerified: boolean;
};

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
};

export class User extends AggregateRoot<UserProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  private constructor(props: UserProps, id: string) {
    super(props, id);
  }

  public static create(props: CreateUserProps, id?: string): User {
    const password = UserPassword.create(props.password, false);

    const user = new User(
      {
        ...props,
        password,
        emailVerified: id ? props.emailVerified : false,
      },
      id,
    );

    if (!id) {
      user.addDomainEvent(new UserCreated(user));
    }

    return user;
  }
}
