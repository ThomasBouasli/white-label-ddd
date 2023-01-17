import { Inject, Injectable } from '@nestjs/common';

import { Permission } from './domain/role/permission';
import { Role } from './domain/role/role';
import { User } from './domain/user/user';
import { LoginDTO, RegisterUserDTO } from './dto';
import { RoleRepository } from './providers/role/role-repository.interface';
import { UserRepository } from './providers/user/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('RoleRepository') private readonly roleRepository: RoleRepository,
  ) {}

  async register(data: RegisterUserDTO): Promise<User> {
    const user = User.create(data);

    await this.userRepository.create(user);

    return user;
  }

  async login(data: LoginDTO) {
    const user = await this.userRepository.findOneByEmail(data.email);

    if (!user) {
      return null;
    }

    const isMatch = user.password.compare(data.password);

    if (isMatch) {
      return user;
    }

    return null;
  }

  async createRole() {
    const role = Role.create('teste');

    role.addPermission(
      Permission.create({
        method: 'ALL',
        resource: 'teste',
      }),
    );

    await this.roleRepository.create(role);
  }
}
