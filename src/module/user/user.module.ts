import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaPermissionMapper } from './providers/role/prisma-permission-mapper';
import { PrismaRoleMapper } from './providers/role/prisma-role-mapper';
import { PrismaRoleRepository } from './providers/role/prisma-role-repository';
import { LocalStrategy } from './providers/strategies/local.strategy';
import { PrismaUserRepository } from './providers/user/prisma-user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PassportModule],
  providers: [
    {
      provide: 'UserMapper',
      useClass: PrismaRoleMapper,
    },
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'RoleMapper',
      useClass: PrismaRoleMapper,
    },
    {
      provide: 'PermissionMapper',
      useClass: PrismaPermissionMapper,
    },
    {
      provide: 'RoleRepository',
      useClass: PrismaRoleRepository,
    },
    UserService,
    LocalStrategy,
  ],
  controllers: [UserController],
})
export class UserModule {}
