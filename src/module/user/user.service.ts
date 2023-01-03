import { Inject, Injectable } from '@nestjs/common';

import { User } from './domain/user/user';
import { RegisterUserDTO } from './dto';
import { UserRepository } from './providers/user-repository/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  public async register(data: RegisterUserDTO): Promise<void> {
    const user = User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.userRepository.create(user);

    return;
  }
}
