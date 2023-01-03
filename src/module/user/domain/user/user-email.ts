import { ValueObject } from '@shared/domain/ValueObject';

export interface UserEmailProps {
  email: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  /**
   *  @desc Email regex from Chromium
   */
  private static regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  private constructor(email: string) {
    super({ email });
  }

  public static create(email: string): UserEmail {
    if (!this.regex.test(email)) {
      throw new Error('Invalid email');
    }

    return new UserEmail(email);
  }

  get value(): string {
    return this.props.email;
  }
}
