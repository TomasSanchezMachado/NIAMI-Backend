import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Order } from './Order';

@Entity()
export class User extends BaseEntity {

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: 'admin' | 'customer';

  @Property({ nullable: true })
  address?: string;

  @Property({ nullable: true })
  phone?: string;

  @OneToMany(() => Order, order => order.user)
  orders = new Collection<Order>(this);
}
