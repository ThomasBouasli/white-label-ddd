import { UserEmail } from './user-email';

describe('UserEmail', () => {
  it('should be defined', () => {
    expect(UserEmail.create).toBeDefined();
  });

  it('should create a valid user email', () => {
    const email = UserEmail.create('john.doe@gmail.com');

    expect(email).toBeDefined();
  });

  it('should throw an error if email is invalid', () => {
    expect(() => UserEmail.create('john.doe')).toThrowError();
  });

  it('should throw an error if email is invalid', () => {
    expect(() => UserEmail.create('john.doe@')).toThrowError();
  });

  it('should throw an error if email is invalid', () => {
    expect(() => UserEmail.create('john.doe@gmail')).toThrowError();
  });

  it('should throw an error if email is invalid', () => {
    expect(() => UserEmail.create('john.doe@gmail.')).toThrowError();
  });
});
