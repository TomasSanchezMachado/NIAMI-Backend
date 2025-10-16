import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Ingredient } from './Ingredient';

@Entity()
export class Provider extends BaseEntity {
  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', nullable: true })
  address?: string | undefined;

  @Property({ type: 'string', nullable: true })
  phone?: string | undefined;

  @Property({ type: 'string', nullable: true })
  email?: string | undefined;

  // One-to-many: Provider -> Ingredient
  @OneToMany(() => Ingredient, ingredient => ingredient.provider)
  ingredients = new Collection<Ingredient>(this);
}
