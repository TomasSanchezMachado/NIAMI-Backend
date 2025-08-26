import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { Product } from './Product';
import { v4 } from 'uuid';

@Entity()
export class Ingredient {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  name: string;

  // Ingredient es el lado inverso, usamos mappedBy
  @ManyToMany(() => Product, undefined, { mappedBy: 'ingredients' })
  products = new Collection<Product>(this);

  constructor(name: string) {
    this.name = name;
  }
}
