import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Product } from './Product';
import { v4 } from 'uuid';

@Entity()
export class Promotion {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

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
