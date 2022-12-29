import { Body, Controller, Post } from '@nestjs/common';

import { RegisterUserRequest } from './DTO';
import { RegisterUserService } from './user.service';

@Controller('user')
export class RegisterUserController {
  constructor(private readonly userService: RegisterUserService) {}

  @Post()
  async execute(@Body() data: RegisterUserRequest) {
    return await this.userService.execute(data);
  }
}
