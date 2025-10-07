import { Migration } from '@mikro-orm/migrations';

export class Migration20250912175336 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "category" ("id" uuid not null, "name" varchar(255) not null, "created_at" date not null, constraint "category_pkey" primary key ("id"));`);

    this.addSql(`create table "product" ("id" uuid not null, "name" varchar(255) not null, constraint "product_pkey" primary key ("id"));`);

    this.addSql(`create table "promotion" ("id" uuid not null, "name" varchar(255) not null, "discount_percent" int not null, "created_at" date not null, constraint "promotion_pkey" primary key ("id"));`);

    this.addSql(`create table "provider" ("id" uuid not null, "name" varchar(255) not null, "created_at" date not null, constraint "provider_pkey" primary key ("id"));`);

    this.addSql(`create table "ingredient" ("id" uuid not null, "name" varchar(255) not null, "provider_id" uuid not null, constraint "ingredient_pkey" primary key ("id"));`);

    this.addSql(`create table "ingredient_products" ("ingredient_id" uuid not null, "product_id" uuid not null, constraint "ingredient_products_pkey" primary key ("ingredient_id", "product_id"));`);

    this.addSql(`create table "supplier" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "name" varchar(255) not null, "contact_email" varchar(255) null, "phone" varchar(255) null, constraint "supplier_pkey" primary key ("id"));`);

    this.addSql(`create table "user" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null, constraint "user_pkey" primary key ("id"));`);

    this.addSql(`create table "order" ("id" varchar(255) not null, "status" varchar(255) not null, "user_id" varchar(255) not null, "created_at" timestamptz not null, constraint "order_pkey" primary key ("id"));`);

    this.addSql(`create table "order_item" ("id" varchar(255) not null, "order_id" varchar(255) not null, "product_id" uuid not null, "quantity" int not null, constraint "order_item_pkey" primary key ("id"));`);

    this.addSql(`alter table "ingredient" add constraint "ingredient_provider_id_foreign" foreign key ("provider_id") references "provider" ("id") on update cascade;`);

    this.addSql(`alter table "ingredient_products" add constraint "ingredient_products_ingredient_id_foreign" foreign key ("ingredient_id") references "ingredient" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "ingredient_products" add constraint "ingredient_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;`);
    this.addSql(`alter table "order_item" add constraint "order_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`);
  }

}
