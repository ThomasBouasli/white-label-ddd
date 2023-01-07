import { UserRole } from './user-role';

describe('UserRole', () => {
  it('should be defined', () => {
    expect(UserRole.create).toBeDefined();
  });

  it('should create a valid user role', () => {
    const role = UserRole.create('ADMIN');
    expect(role).toBeDefined();
  });

  it('should throw an error if role is invalid', () => {
    // @ts-expect-error - Testing invalid role
    expect(() => UserRole.create('INVALID')).toThrowError();
  });
});
