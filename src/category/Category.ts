import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/entities/BaseEntity';

@Entity()
export class Category extends BaseEntity {
  @Property({ type: 'string' })
  name!: string;
}
