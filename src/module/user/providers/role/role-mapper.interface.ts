import { Role } from '@module/user/domain/role/role';

export interface RoleMapper<P> {
  toDomain(persistence: P): Role;
  toPersistence(role: Role): P;
}
