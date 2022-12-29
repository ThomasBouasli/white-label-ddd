import { UniqueIdentifier } from '@shared/domain/UniqueIdentifier';
import { IDomainEvent } from '@shared/domain/events/IDomainEvent';

import { User } from '../User';

export class UserCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueIdentifier {
    return this.user.id;
  }
}
