import { Role } from '@module/user/domain/role/role';

export interface RoleRepository {
  create(role: Role): Promise<void>;
  update(role: Role): Promise<Role>;
  delete(role: Role): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
}
