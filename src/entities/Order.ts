import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from './User';
import { OrderItem } from './OrderItem';

@Entity()
export class Order {

  @PrimaryKey()
  id: string = v4();

  @Property()
  status!: 'pending' | 'completed' | 'canceled';

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => OrderItem, item => item.order)
  items = new Collection<OrderItem>(this);

  @Property()
  createdAt: Date = new Date();
}
