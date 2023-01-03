import { UserName } from './user-name';

describe('UserName', () => {
  it('should be defined', () => {
    expect(UserName.create).toBeDefined();
  });

  it('should create a valid user name', () => {
    const name = UserName.create('John Doe');
    expect(name).toBeDefined();
  });

  it('should throw an error if name is too short', () => {
    expect(() => UserName.create('Jo')).toThrowError();
  });

  it('should throw an error if name is too long', () => {
    expect(() => UserName.create('a'.repeat(101))).toThrowError();
  });
});
