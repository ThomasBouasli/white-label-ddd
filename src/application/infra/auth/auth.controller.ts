import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { User } from '@module/user/domain/user/user';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: Omit<User, 'password'> }) {
    return await this.authService.login({
      email: req.user.email.value,
      id: req.user.id.value,
      role: req.user.role.value,
    });
  }

  @Roles('COMMON')
  @Get('role/common')
  getCommonProfile(@Request() req: any) {
    return req.user;
  }

  @Roles('ADMIN')
  @Get('role/admin')
  getProfileAdmin(@Request() req: any) {
    return req.user;
  }
}
