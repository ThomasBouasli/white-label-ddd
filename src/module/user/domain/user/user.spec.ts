import { faker } from '@faker-js/faker';

import { User } from './user';

describe('User', () => {
  it('should be defined', () => {
    expect(User.create).toBeDefined();
  });

  it('should create a valid user', () => {
    const dummy = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: faker.datatype.uuid(),
    };

    const user = User.create(dummy);

    expect(user).toBeDefined();
    expect(user.name.value).toEqual(dummy.name);
    expect(user.email.value).toEqual(dummy.email);
    expect(user.password.value).not.toEqual(dummy.password);
  });
});
