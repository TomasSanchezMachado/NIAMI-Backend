import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity()
export class Promotion extends BaseEntity {
  @Property({ type: 'string' })
  description!: string;

  @Property({ type: 'number' })
  discount!: number;

  @Property({ type: 'date' })
  startDate!: Date;

  @Property({ type: 'date' })
  endDate!: Date;

  // Many-to-one: Promotion -> Product
  @ManyToOne(() => Product)
  product!: Product;
}
