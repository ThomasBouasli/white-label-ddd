import { User } from './user';

describe('User', () => {
  it('should be defined', () => {
    expect(User.create).toBeDefined();
  });

  it('should create a valid user', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '12345678',
      emailVerified: false,
      role: 'COMMON',
    });

    expect(user).toBeDefined();
  });
});
