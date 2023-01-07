import { User } from '@module/user/domain/user/user';

const admin = User.create({
  name: 'admin',
  email: 'admin@admin.com',
  password: 'Senha@123',
  role: 'ADMIN',
});

export const users = [admin];
