import { AggregateRoot } from '@shared/domain/AggregateRoot';

import { UserCreated } from '../events/user-created';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';

export interface UserProps {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: CreateUserProps, id?: string): User {
    const { emailVerified, createdAt, updatedAt } = props;
    const name = UserName.create(props.name);
    const email = UserEmail.create(props.email);
    const password = UserPassword.create(props.password, !!id);

    if (id) {
      if (!props.createdAt) {
        throw new Error('createdAt is required');
      }

      if (!props.updatedAt) {
        throw new Error('updatedAt is required');
      }

      if (props.createdAt > props.updatedAt) {
        throw new Error('Update date cannot be before creation date');
      }
    } else {
      if (emailVerified) {
        throw new Error('Email cannot be verified on creation');
      }
    }

    const data: UserProps = {
      name,
      email,
      password,
      emailVerified,
      createdAt,
      updatedAt,
    };

    const user = new User(data, id);

    if (!id) {
      user.addDomainEvent(new UserCreated(user));
    }

    return user;
  }

  public get name(): UserName {
    return this.props.name;
  }

  public get email(): UserEmail {
    return this.props.email;
  }

  public get password(): UserPassword {
    return this.props.password;
  }

  public get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
