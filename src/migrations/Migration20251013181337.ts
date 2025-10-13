import { Migration } from '@mikro-orm/migrations';

export class Migration20251013181337 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "product" add column "category_id" uuid not null;`);
    this.addSql(`alter table "product" add constraint "product_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;`);
    this.addSql(`alter table "product" rename column "name" to "description";`);

    this.addSql(`alter table "promotion" add column "product_id" uuid not null;`);
    this.addSql(`alter table "promotion" add constraint "promotion_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product" drop constraint "product_category_id_foreign";`);

    this.addSql(`alter table "promotion" drop constraint "promotion_product_id_foreign";`);

    this.addSql(`alter table "product" drop column "category_id";`);

    this.addSql(`alter table "product" rename column "description" to "name";`);

    this.addSql(`alter table "promotion" drop column "product_id";`);
  }

}
