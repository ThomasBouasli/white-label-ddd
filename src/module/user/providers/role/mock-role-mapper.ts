import { Inject, Injectable } from '@nestjs/common';

import { Role } from '@module/user/domain/role/role';

import {
  MockPermissionMapper,
  Persistence as PermissionPersistence,
} from './mock-permission-mapper';
import { RoleMapper } from './role-mapper.interface';

export interface Persistence {
  id: string;
  name: string;
  permissions: PermissionPersistence[];
}

@Injectable()
export class MockRoleMapper implements RoleMapper<Persistence> {
  constructor(
    @Inject('PermissionMapper')
    private readonly permissionMapper: MockPermissionMapper,
  ) {}

  toDomain(persistence: Persistence): Role {
    return Role.create(
      {
        name: persistence.name,
        permissions: persistence.permissions.map((permission) => {
          return this.permissionMapper.toDomain(permission);
        }),
      },
      persistence.id,
    );
  }

  toPersistence(role: Role): Persistence {
    return {
      id: role.id.value,
      name: role.name,
      permissions: role.permissions.map((permission) => {
        return this.permissionMapper.toPersistence(permission);
      }),
    };
  }
}
