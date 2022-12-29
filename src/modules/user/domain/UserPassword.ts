import { hash, compare } from 'bcrypt';

import { ValueObject } from '@shared/domain/ValueObject';

export type UserPasswordProps = {
  value: string;
  hashed: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  get isHashed(): boolean {
    return this.props.hashed;
  }

  public async compare(password: UserPassword): Promise<boolean>;
  public async compare(plainText: string): Promise<boolean>;
  public async compare(
    passwordOrPlainText: UserPassword | string,
  ): Promise<boolean> {
    if (
      passwordOrPlainText instanceof UserPassword &&
      passwordOrPlainText.isHashed
    ) {
      return this.value === passwordOrPlainText.value;
    }

    const password =
      passwordOrPlainText instanceof UserPassword
        ? passwordOrPlainText.value
        : passwordOrPlainText;

    return compare(password, this.value);
  }

  public async hash(): Promise<UserPassword> {
    const hashedPassword = await hash(this.value, 10);
    return UserPassword.create(hashedPassword, true);
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  public static create(value: string, hashed = false): UserPassword {
    return new UserPassword({ value, hashed });
  }
}
