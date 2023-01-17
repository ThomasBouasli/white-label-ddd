import { Injectable } from '@nestjs/common';
import { Permission as Persistence } from '@prisma/client';

import { Permission as Entity } from '@module/user/domain/role/permission';

@Injectable()
export class PrismaPermissionMapper {
  toEntity(persistence: Persistence): Entity {
    return Entity.create(persistence.name, persistence.id);
  }

  toPersistence(entity: Entity): Persistence {
    return {
      id: entity.id.value,
      name: entity.value,
    };
  }
}
