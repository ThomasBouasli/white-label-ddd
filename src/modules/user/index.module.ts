import { Module } from '@nestjs/common';

//Infrastructure
import { PrismaUserRepository } from './infra/repository/user/prisma';
import { RegisterUserController } from './use-case/register-user/user.controller';
//UseCases
import { RegisterUserService } from './use-case/register-user/user.service';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    RegisterUserService,
  ],
  controllers: [RegisterUserController],
})
export class UserModule {}
