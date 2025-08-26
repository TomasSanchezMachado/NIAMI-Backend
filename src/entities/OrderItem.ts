import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Order } from './Order';
import { Product } from './Product';

@Entity()
export class OrderItem {

  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity!: number;
}
