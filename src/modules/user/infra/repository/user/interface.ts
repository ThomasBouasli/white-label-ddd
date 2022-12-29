import { User } from '../../../domain/User';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
