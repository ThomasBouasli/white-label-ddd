import { User } from '@module/user/domain/user/user';

export interface UserMapper<P> {
  toDomain(persistence: P): User;
  toPersistence(role: User): P;
}
