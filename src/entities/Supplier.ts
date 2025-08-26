import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Supplier extends BaseEntity {

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', nullable: true })
  contactEmail?: string;

  @Property({ type: 'string', nullable: true })
  phone?: string;

}
