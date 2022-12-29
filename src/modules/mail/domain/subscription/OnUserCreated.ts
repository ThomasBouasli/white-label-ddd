import { Inject } from '@nestjs/common';

import { TokenProvider } from '@application/infra/providers/Token/interface';

import { DomainEvents } from '@shared/domain/events/DomainEvents';
import { IHandle } from '@shared/domain/events/IHandle';

import { MailProvider } from '@module/mail/infra/provider/interface';
import { UserCreated } from '@module/user/domain/events/UserCreated';

export class OnUserCreated implements IHandle {
  constructor(
    @Inject('MailProvider') private mailProvider: MailProvider,
    @Inject('TokenProvider') private tokenProvider: TokenProvider,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreated.name);
  }
  private async onUserCreatedEvent(event: UserCreated): Promise<void> {
    const { user } = event;

    const token = await this.tokenProvider.generateToken({
      email: user.email,
    });

    await this.mailProvider.sendEmailConfirmation(user.email, token);

    console.log(`[SEND EMAIL] - to: ${user.email} - token: ${token}`);
  }
}
