import { compareSync, hashSync } from 'bcrypt';

import { ValueObject } from '@shared/domain/ValueObject';

export interface UserPasswordProps {
  password: string;
  isHashed: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(password: string, isHashed: boolean) {
    super({ password, isHashed });
  }

  public static create(password: string, isHashed = false): UserPassword {
    if (password.length < 6) {
      throw new Error('Password is too short');
    }

    if (!isHashed) {
      const hashedPassword = hashSync(password, 10);

      return new UserPassword(hashedPassword, true);
    }

    return new UserPassword(password, isHashed);
  }

  public compare(password: string): boolean {
    return compareSync(password, this.value);
  }

  get value(): string {
    return this.props.password;
  }

  get isHashed(): boolean {
    return this.props.isHashed;
  }
}
