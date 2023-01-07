import { Controller, Get, Post, Request } from '@nestjs/common';

import { Public } from '@application/infra/auth/decorators/public.decorator';
import { Roles } from '@application/infra/auth/decorators/roles.decorator';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Request() req: any) {
    return this.userService.registerCommonUser(req.body);
  }

  @Roles('ADMIN')
  @Post('register-admin')
  async registerAdmin(@Request() req: any) {
    return this.userService.registerAdminUser(req.body);
  }

  @Get('/:email')
  async getUser(@Request() req: any) {
    return this.userService.getUser(req.params.email);
  }
}
