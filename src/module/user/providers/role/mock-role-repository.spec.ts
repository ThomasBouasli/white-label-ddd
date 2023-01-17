import { Test, TestingModule } from '@nestjs/testing';

import { Permission } from '@module/user/domain/role/permission';
import { Role } from '@module/user/domain/role/role';

import { MockPermissionMapper } from './mock-permission-mapper';
import { MockRoleMapper } from './mock-role-mapper';
import { MockRoleRepository } from './mock-role-repository';

describe('MockRoleRepository', () => {
  let provider: MockRoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'RoleMapper',
          useClass: MockRoleMapper,
        },
        {
          provide: 'PermissionMapper',
          useClass: MockPermissionMapper,
        },
        MockRoleRepository,
      ],
    }).compile();

    provider = module.get<MockRoleRepository>(MockRoleRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should create a role', async () => {
    const role = Role.create('test');

    await provider.create(role);

    expect(provider.roles).toHaveLength(1);
  });

  it('should create a role with permissions', async () => {
    const role = Role.create('test');
    const permission = Permission.create({
      method: 'ALL',
      resource: 'test',
    });

    role.addPermission(permission);

    await provider.create(role);

    const found = await provider.findByName('test');

    expect(found).toBeDefined();
    expect(found.permissions).toHaveLength(1);
    expect(found.permissions[0].equals(permission)).toBeTruthy();
    expect(provider.rolePermissions[0]).toEqual({
      roleId: found.id.value,
      permissionId: permission.id.value,
    });
  });

  it('should remove a permission from role', async () => {
    const role = Role.create('test');
    const permission = Permission.create({
      method: 'ALL',
      resource: 'test',
    });

    role.addPermission(permission);

    await provider.create(role);

    role.removePermission(permission);

    await provider.update(role);

    const found = await provider.findByName('test');

    expect(found).toBeDefined();
    expect(found.permissions).toHaveLength(0);
    expect(provider.rolePermissions).toHaveLength(0);
    expect(provider.permissions).toHaveLength(1);
  });
});
