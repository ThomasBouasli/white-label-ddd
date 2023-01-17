import { Global, Module } from '@nestjs/common';

import { UserModule } from '@module/user/user.module';

import { PrismaService } from './infra/database/prisma';

@Global()
@Module({
  imports: [UserModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
