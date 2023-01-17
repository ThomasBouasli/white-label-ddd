import { faker } from '@faker-js/faker';

import { Permission } from './permission';

describe('Permission', () => {
  it('should be defined', () => {
    expect(Permission.create).toBeDefined();
  });

  it('should create a permission', () => {
    const permission = Permission.create({
      method: 'READ',
      resource: 'user',
    });

    expect(permission).toBeDefined();
    expect(permission.method).toEqual('READ');
    expect(permission.resource).toEqual('user');
  });

  it('should create a permission from string', () => {
    const permission = Permission.create('READ:user', faker.datatype.uuid());

    expect(permission).toBeDefined();
    expect(permission.method).toEqual('READ');
    expect(permission.resource).toEqual('user');
  });

  it('should throw an error if permission is invalid', () => {
    expect(() => Permission.create('READ', faker.datatype.uuid())).toThrow();
  });
});
