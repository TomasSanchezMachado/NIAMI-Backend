
import { Entity, PrimaryKey, Property, ManyToMany, Collection, ManyToOne } from '@mikro-orm/core';
import { Product } from './Product';
import { Provider } from './Provider';
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

  // Relación ManyToOne: cada ingrediente tiene un proveedor
  @ManyToOne(() => Provider)
  provider!: Provider;

  constructor(name: string, provider: Provider) {
    this.name = name;
    this.provider = provider;
  }
}
