import { UserRoleType } from '@module/user/domain/user/user-role';

export class TokenDTO {
  email: string;
  id: string;
  role: UserRoleType;
}
