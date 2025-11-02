
import { Entity, Property, ManyToMany, Collection, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/entities/BaseEntity';
import { Product } from '../product/Product';
import { Provider } from '../provider/Provider';

@Entity()
export class Ingredient extends BaseEntity {
  @Property()
  description: string;

  // Many-to-many: Ingredient <-> Product
  @ManyToMany(() => Product, undefined, { mappedBy: 'ingredients' })
  products = new Collection<Product>(this);

  // Many-to-one: Ingredient -> Provider
  @ManyToOne(() => Provider)
  provider!: Provider;

  constructor(description: string, provider: Provider) {
    super();
    this.description = description;
    this.provider = provider;
  }
}
