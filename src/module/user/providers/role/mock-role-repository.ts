import { Inject, Injectable } from '@nestjs/common';

import { Role } from '@module/user/domain/role/role';

import { Persistence as PermissionPersistence } from './mock-permission-mapper';
import { Persistence as RolePersistence } from './mock-role-mapper';
import { PermissionMapper } from './permission-mapper.interface';
import { RoleMapper } from './role-mapper.interface';
import { RoleRepository } from './role-repository.interface';

@Injectable()
export class MockRoleRepository implements RoleRepository {
  constructor(
    @Inject('RoleMapper')
    private readonly roleMapper: RoleMapper<RolePersistence>,
    @Inject('PermissionMapper')
    private readonly permissionMapper: PermissionMapper<PermissionPersistence>,
  ) {}

  public roles: Omit<RolePersistence, 'permissions'>[] = [];
  public permissions: PermissionPersistence[] = [];
  public rolePermissions: { roleId: string; permissionId: string }[] = [];

  async create(role: Role): Promise<void> {
    const rolePersistence = this.roleMapper.toPersistence(role);
    const rolePermissions = role.permissions.map((permission) => {
      return {
        roleId: rolePersistence.id,
        permissionId: permission.id.value,
      };
    });
    const permissions = role.permissions.map((permission) =>
      this.permissionMapper.toPersistence(permission),
    );

    this.roles.push(rolePersistence);
    this.permissions.push(...permissions);
    this.rolePermissions.push(...rolePermissions);
  }

  async update(role: Role): Promise<Role> {
    await this.updateRole(role);
    await this.updatePermissions(role);

    return role;
  }

  private async updateRole(role: Role): Promise<Role> {
    const roleIndex = this.roles.findIndex((r) => r.id === role.id.value);

    const rolePersistence = this.roleMapper.toPersistence(role);

    this.roles[roleIndex] = rolePersistence;

    return role;
  }

  private async updatePermissions(role: Role): Promise<Role> {
    const rolePermissions = this.rolePermissions.filter(
      (rp) => rp.roleId === role.id.value,
    );

    const addedRoles = role.getPermissionsList().getNewItems();

    for (const addedRole of addedRoles) {
      const alreadyExists = rolePermissions.some(
        (rp) => rp.permissionId === addedRole.id.value,
      );

      if (alreadyExists) {
        throw new Error('Permission already exists');
      }
    }

    const removedRoles = role.getPermissionsList().getRemovedItems();

    for (const removedRole of removedRoles) {
      const alreadyExists = rolePermissions.some(
        (rp) => rp.permissionId === removedRole.id.value,
      );

      if (!alreadyExists) {
        throw new Error('Permission does not exists');
      }
    }

    const addedPermissions = addedRoles.map((permission) =>
      this.permissionMapper.toPersistence(permission),
    );

    const removedPermissions = removedRoles.map((permission) =>
      this.permissionMapper.toPersistence(permission),
    );

    this.permissions.push(...addedPermissions);
    this.rolePermissions.push(
      ...addedRoles.map((permission) => ({
        roleId: role.id.value,
        permissionId: permission.id.value,
      })),
    );

    this.permissions = this.permissions.filter(
      (p) => !removedPermissions.some((rp) => rp.id === p.id),
    );

    this.rolePermissions = this.rolePermissions.filter(
      (p) =>
        !removedPermissions.some((rp) => rp.id === p.permissionId) &&
        p.roleId !== role.id.value,
    );

    return role;
  }

  async delete(role: Role): Promise<Role> {
    const roleIndex = this.roles.findIndex((r) => r.id === role.id.value);

    this.roles.splice(roleIndex, 1);

    return role;
  }

  async findById(id: string): Promise<Role> {
    const rolePersistence = this.roles.find((r) => r.id === id);

    if (!rolePersistence) {
      return null;
    }

    const rolePermissions = this.rolePermissions.filter(
      (rp) => rp.roleId === rolePersistence.id,
    );

    const permissions = rolePermissions.map((rp) =>
      this.permissions.find((p) => p.id === rp.permissionId),
    );

    const role = this.roleMapper.toDomain({
      id: rolePersistence.id,
      name: rolePersistence.name,
      permissions: permissions,
    });

    return role;
  }

  async findByName(name: string): Promise<Role> {
    const rolePersistence = this.roles.find((r) => r.name === name);

    if (!rolePersistence) {
      return null;
    }

    const rolePermissions = this.rolePermissions.filter(
      (rp) => rp.roleId === rolePersistence.id,
    );

    const permissions = rolePermissions.map((rp) =>
      this.permissions.find((p) => p.id === rp.permissionId),
    );

    const role = this.roleMapper.toDomain({
      id: rolePersistence.id,
      name: rolePersistence.name,
      permissions: permissions,
    });

    return role;
  }
}
