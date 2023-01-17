import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '@application/infra/database/prisma';

import { Role } from '@module/user/domain/role/role';

import { Persistence } from './prisma-role-mapper';
import { RoleMapper } from './role-mapper.interface';
import { RoleRepository } from './role-repository.interface';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(
    @Inject('RoleMapper') private readonly roleMapper: RoleMapper<Persistence>,
    private readonly prisma: PrismaService,
  ) {}

  async create(role: Role): Promise<void> {
    const persistence = this.roleMapper.toPersistence(role);

    await this.prisma.role.create({
      data: {
        ...persistence.role,
        permissions: {
          create: persistence.currentPermissions.map((permission) => ({
            permission: {
              create: {
                ...permission,
              },
            },
          })),
        },
      },
    });

    return;
  }

  async update(role: Role): Promise<Role> {
    const persistence = this.roleMapper.toPersistence(role);

    const updatedRole = await this.prisma.role.create({
      data: {
        ...persistence.role,
        permissions: {
          create: persistence.newPermissions.map((permission) => ({
            permission: {
              create: {
                ...permission,
              },
            },
          })),
        },
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    await this.prisma.rolePermissions.deleteMany({
      where: {
        roleId: persistence.role.id,
        permissionId: {
          in: persistence.currentPermissions.map((permission) => permission.id),
        },
      },
    });

    return this.roleMapper.toDomain({
      role: {
        id: updatedRole.id,
        name: updatedRole.name,
      },
      currentPermissions: updatedRole.permissions.map(
        (rolePermission) => rolePermission.permission,
      ),
      newPermissions: [],
      removedPermissions: [],
    });
  }

  async delete(role: Role): Promise<Role> {
    const persistence = this.roleMapper.toPersistence(role);

    const deletedRole = await this.prisma.role.delete({
      where: {
        id: persistence.role.id,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return this.roleMapper.toDomain({
      role: {
        id: deletedRole.id,
        name: deletedRole.name,
      },
      currentPermissions: deletedRole.permissions.map(
        (rolePermission) => rolePermission.permission,
      ),
      newPermissions: [],
      removedPermissions: [],
    });
  }

  async findById(id: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return this.roleMapper.toDomain({
      role: {
        id: role.id,
        name: role.name,
      },
      currentPermissions: role.permissions.map(
        (rolePermission) => rolePermission.permission,
      ),
      newPermissions: [],
      removedPermissions: [],
    });
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: {
        name,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return this.roleMapper.toDomain({
      role: {
        id: role.id,
        name: role.name,
      },
      currentPermissions: role.permissions.map(
        (rolePermission) => rolePermission.permission,
      ),
      newPermissions: [],
      removedPermissions: [],
    });
  }
}
