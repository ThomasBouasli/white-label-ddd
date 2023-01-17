import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return req.user;
  }

  @Post('register')
  async register(@Request() req: any) {
    return this.userService.register(req.body);
  }

  @Post('register-role')
  async registerRole(@Request() req: any) {
    return this.userService.createRole();
  }
}
