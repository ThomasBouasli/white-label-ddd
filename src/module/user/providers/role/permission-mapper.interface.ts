import { Permission } from '@module/user/domain/role/permission';

export interface PermissionMapper<P> {
  toDomain(persistence: P): Permission;
  toPersistence(permission: Permission): P;
}
