import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Order } from './Order';
import { Product } from './Product';

@Entity()
export class OrderItem extends BaseEntity {

  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;
  @Property({ nullable: true })
  description?: string;

  @Property({ type: 'float' })
  price: number = 0;

  @Property()
  quantity!: number;
}
