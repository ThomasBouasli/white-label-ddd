import { Controller, Post, Request } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Request() req: any) {
    return this.userService.register(req.body);
  }
}
