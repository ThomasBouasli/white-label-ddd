import { Global, Module } from '@nestjs/common';

import { MailModule } from '@module/mail/mail.module';
import { UserModule } from '@module/user/index.module';

import { PrismaService } from './infra/database/prisma';
import { MockTokenProvider } from './infra/providers/Token/mock';

@Global()
@Module({
  imports: [UserModule, MailModule],
  providers: [
    PrismaService,
    {
      provide: 'TokenProvider',
      useValue: MockTokenProvider,
    },
  ],
  exports: [
    PrismaService,
    { provide: 'TokenProvider', useValue: MockTokenProvider },
  ],
})
export class AppModule {}
