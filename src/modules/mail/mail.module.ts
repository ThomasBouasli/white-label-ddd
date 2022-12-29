import { Module } from '@nestjs/common';

import { OnUserCreated } from './domain/subscription/OnUserCreated';
import { NodeMailerMailProvider } from './infra/provider/nodemailer';

@Module({
  providers: [
    OnUserCreated,
    {
      provide: 'MailProvider',
      useClass: NodeMailerMailProvider,
    },
  ],
})
export class MailModule {}
