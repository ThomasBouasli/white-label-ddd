import { ValueObject } from '@shared/domain/ValueObject';

export type UserRoleType = 'ADMIN' | 'COMMON';

export interface UserRoleProps {
  value: UserRoleType;
}

export class UserRole extends ValueObject<UserRoleProps> {
  private constructor(props: UserRoleProps) {
    super(props);
  }

  get value(): UserRoleType {
    return this.props.value;
  }

  public static create(role: UserRoleType): UserRole {
    //throw error if role is invalid
    if (!['ADMIN', 'COMMON'].includes(role)) {
      throw new Error('Invalid role');
    }

    return new UserRole({ value: role });
  }
}
