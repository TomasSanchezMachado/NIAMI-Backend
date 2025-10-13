import { Entity, PrimaryKey, Property, ManyToMany, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { Ingredient } from './Ingredient';
import { Category } from './Category';
import { Promotion } from './Promotion';
import { OrderItem } from './OrderItem';
import { v4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  description: string;

  @Property({ nullable: true })
  image?: string | undefined;

  @Property({ type: 'float', nullable: false })
  price: number;

  // Many-to-one: Product -> Category
  @ManyToOne(() => Category)
  category!: Category;

  // One-to-many: Product -> Promotion
  @OneToMany(() => Promotion, promotion => promotion.product)
  promotions = new Collection<Promotion>(this);

  // One-to-many: Product -> OrderItem
  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems = new Collection<OrderItem>(this);

  // Many-to-many: Product <-> Ingredient
  @ManyToMany(() => Ingredient, ingredient => ingredient.products)
  ingredients = new Collection<Ingredient>(this);

  constructor(description: string, price: number, category: Category, image?: string) {
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
  }
}
