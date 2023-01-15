import { UniqueIdentifier, IDomainEvent } from '@thomasbouasli/ddd-utils';

import { User } from '../user/user';

export class UserCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  public getAggregateId(): UniqueIdentifier {
    return this.user.id;
  }
}
