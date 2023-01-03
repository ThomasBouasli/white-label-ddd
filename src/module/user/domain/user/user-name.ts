import { ValueObject } from '@shared/domain/ValueObject';

export interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  private constructor(name: string) {
    super({ name });
  }

  public static create(name: string): UserName {
    if (name.length < 3) {
      throw new Error('Name is too short');
    }

    if (name.length > 100) {
      throw new Error('Name is too long');
    }

    return new UserName(name);
  }

  get value(): string {
    return this.props.name;
  }
}
