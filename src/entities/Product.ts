import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { Ingredient } from './Ingredient';
import { v4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  name: string;

  // Product es el lado propietario
  @ManyToMany(() => Ingredient, ingredient => ingredient.products)
  ingredients = new Collection<Ingredient>(this);

  constructor(name: string) {
    this.name = name;
  }
}
