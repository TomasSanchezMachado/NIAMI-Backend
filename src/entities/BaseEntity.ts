import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {

  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
