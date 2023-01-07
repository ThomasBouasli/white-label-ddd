import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@module/user/domain/user/user';
import { UserRepository } from '@module/user/providers/user-repository/user-repository.interface';

import { TokenDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.password.compare(password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user;
    }
    return null;
  }

  async login(token: TokenDTO) {
    const payload: TokenDTO = {
      email: token.email,
      id: token.id,
      role: token.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
