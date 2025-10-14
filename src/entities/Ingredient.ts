
import { Entity, PrimaryKey, Property, ManyToMany, Collection, ManyToOne } from '@mikro-orm/core';
import { Product } from './Product';
import { Provider } from './Provider';
import { v4 } from 'uuid';

@Entity()
export class Ingredient {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  description: string;


  // Many-to-many: Ingredient <-> Product
  @ManyToMany(() => Product, undefined, { mappedBy: 'ingredients' })
  products = new Collection<Product>(this);

  // Many-to-one: Ingredient -> Provider
  @ManyToOne(() => Provider)
  provider!: Provider;

  constructor(description: string, provider: Provider) {
    this.description = description;
    this.provider = provider;
  }
}
