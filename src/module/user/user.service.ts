import { Inject, Injectable } from '@nestjs/common';

import { User } from './domain/user/user';
import { RegisterUserDTO } from './dto';
import { UserRepository } from './providers/user-repository/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  public async registerCommonUser(data: RegisterUserDTO): Promise<void> {
    const user = User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'COMMON',
    });

    await this.userRepository.create(user);

    return;
  }

  public async registerAdminUser(data: RegisterUserDTO): Promise<void> {
    const user = User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'ADMIN',
    });

    await this.userRepository.create(user);

    return;
  }

  public async getUser(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
