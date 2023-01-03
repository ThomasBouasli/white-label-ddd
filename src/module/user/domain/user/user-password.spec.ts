import { UserPassword } from './user-password';

describe('UserPassword', () => {
  it('should be defined', () => {
    expect(UserPassword.create).toBeDefined();
  });

  it('should create a valid user password', () => {
    const password = UserPassword.create('12345678');
    expect(password).toBeDefined();
  });

  it('should throw an error if password is too short', () => {
    expect(() => UserPassword.create('123')).toThrowError();
  });

  it('should successfully compare a password with a string', () => {
    const password = UserPassword.create('12345678');

    expect(password.compare('12345678')).toBeTruthy();
  });

  it('should compare a password with a string and fail', () => {
    const password = UserPassword.create('12345678');

    expect(password.compare('123456789')).toBeFalsy();
  });
});
