import { Module } from '@nestjs/common';

import { PrismaUserRepository } from './providers/user-repository/prisma-user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },

    UserService,
  ],
  controllers: [UserController],
  exports: [
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
