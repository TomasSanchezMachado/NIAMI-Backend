import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { OrderItem } from './OrderItem';

@Entity()
export class Order extends BaseEntity {

  @Property()
  status!: 'pending' | 'completed' | 'canceled';

  @Property({ nullable: true })
  description?: string;

  @Property({ type: 'float' })
  totalPrice: number = 0;

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => OrderItem, item => item.order)
  items = new Collection<OrderItem>(this);
}
