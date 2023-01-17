import { User } from '@module/user/domain/user/user';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<User>;
  findOneById(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
}
