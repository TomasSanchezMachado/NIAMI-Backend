import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Product } from './Product';
import { v4 } from 'uuid';

@Entity()
export class Promotion {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'number' })
  discountPercent!: number;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  // Many-to-one: Promotion -> Product
  @ManyToOne(() => Product)
  product!: Product;
}
