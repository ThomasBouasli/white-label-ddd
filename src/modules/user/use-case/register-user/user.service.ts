import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../domain/User';
import { UserRepository } from '../../infra/repository/user/interface';
import { RegisterUserRequest, RegisterUserResponse } from './DTO';

@Injectable()
export class RegisterUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    request: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
    const user = User.create({
      name: request.name,
      email: request.email,
      password: request.password,
    });

    await this.userRepository.save(user);

    return;
  }
}
