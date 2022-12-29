import { UniqueIdentifier } from '../UniqueIdentifier';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueIdentifier;
}
