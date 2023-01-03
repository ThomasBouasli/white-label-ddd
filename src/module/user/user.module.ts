import { Module } from '@nestjs/common';

import { MockUserRepository } from './providers/user-repository/mock-user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: MockUserRepository,
    },

    UserService,
  ],
  controllers: [UserController],
  exports: [
    {
      provide: 'UserRepository',
      useClass: MockUserRepository,
    },
  ],
})
export class UserModule {}
