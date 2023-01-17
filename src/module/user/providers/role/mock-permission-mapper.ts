import { Injectable } from '@nestjs/common';

import { Permission } from '@module/user/domain/role/permission';

import { PermissionMapper } from './permission-mapper.interface';

export interface Persistence {
  id: string;
  name: string;
}

@Injectable()
export class MockPermissionMapper implements PermissionMapper<Persistence> {
  toDomain(persistence: Persistence): Permission {
    return Permission.create(persistence.name, persistence.id);
  }

  toPersistence(permission: Permission): Persistence {
    return {
      id: permission.id.value,
      name: permission.value,
    };
  }
}
