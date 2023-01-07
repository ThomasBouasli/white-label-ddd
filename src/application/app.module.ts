import { Global, Module } from '@nestjs/common';

import { AuthModule } from '@application/infra/auth/auth.module';

import { UserModule } from '@module/user/user.module';

import { PrismaService } from './infra/database/prisma';

@Global()
@Module({
  imports: [AuthModule, UserModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
