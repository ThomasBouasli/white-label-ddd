import { Role } from './role';

describe('Role', () => {
  it('should be defined', () => {
    expect(Role.create('test')).toBeDefined();
  });
});
