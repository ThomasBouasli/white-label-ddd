import { Inject, Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';

import { Role as Entity } from '@module/user/domain/role/role';

import { PrismaPermissionMapper } from './prisma-permission-mapper';
import { RoleMapper } from './role-mapper.interface';

interface RolePersistence {
  id: string;
  name: string;
}

export interface Persistence {
  role: RolePersistence;
  currentPermissions: Permission[];
  newPermissions: Permission[];
  removedPermissions: Permission[];
}

@Injectable()
export class PrismaRoleMapper implements RoleMapper<Persistence> {
  constructor(
    @Inject('PermissionMapper')
    private readonly permissionMapper: PrismaPermissionMapper,
  ) {}

  toDomain(persistence: Persistence): Entity {
    return Entity.create(
      {
        name: persistence.role.name,
        permissions: persistence.currentPermissions.map((permission) =>
          this.permissionMapper.toEntity(permission),
        ),
      },
      persistence.role.id,
    );
  }

  toPersistence(entity: Entity): Persistence {
    return {
      role: {
        id: entity.id.value,
        name: entity.name,
      },
      currentPermissions: entity.permissions.map((permission) =>
        this.permissionMapper.toPersistence(permission),
      ),
      newPermissions: entity
        .getPermissionsList()
        .getRemovedItems()
        .map((permission) => this.permissionMapper.toPersistence(permission)),
      removedPermissions: entity
        .getPermissionsList()
        .getNewItems()
        .map((permission) => this.permissionMapper.toPersistence(permission)),
    };
  }
}
