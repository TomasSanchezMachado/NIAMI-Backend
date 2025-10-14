import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Ingredient } from './Ingredient';
import { v4 } from 'uuid';

@Entity()
export class Provider {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', nullable: true })
  address?: string | undefined;

  @Property({ type: 'string', nullable: true })
  phone?: string | undefined;

  @Property({ type: 'string', nullable: true })
  email?: string | undefined;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  // One-to-many: Provider -> Ingredient
  @OneToMany(() => Ingredient, ingredient => ingredient.provider)
  ingredients = new Collection<Ingredient>(this);
}
