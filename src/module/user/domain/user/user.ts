import { AggregateRoot } from '@shared/domain/AggregateRoot';

import { UserCreated } from '../events/user-created';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole, UserRoleType } from './user-role';

export interface UserProps {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  emailVerified: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  role: UserRoleType;
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
    const role = UserRole.create(props.role);

    if (id) {
      if (!props?.createdAt) {
        throw new Error('createdAt is required');
      }

      if (!props?.updatedAt) {
        throw new Error('updatedAt is required');
      }

      if (props.createdAt > props.updatedAt) {
        throw new Error('Update date cannot be before creation date');
      }

      if (!props.role) {
        throw new Error('Role is required');
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
      emailVerified: emailVerified ?? false,
      role,
      createdAt: createdAt ?? new Date(),
      updatedAt: updatedAt ?? new Date(),
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

  public get role(): UserRole {
    return this.props.role;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
