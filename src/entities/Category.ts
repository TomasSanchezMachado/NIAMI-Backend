import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Category extends BaseEntity {
  @Property({ type: 'string' })
  name!: string;
}
