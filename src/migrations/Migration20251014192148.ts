import { Migration } from '@mikro-orm/migrations';

export class Migration20251014192148 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop table if exists "supplier" cascade;`);

    this.addSql(`alter table "promotion" add column "end_date" date not null;`);
    this.addSql(`alter table "promotion" rename column "name" to "description";`);
    this.addSql(`alter table "promotion" rename column "discount_percent" to "discount";`);
    this.addSql(`alter table "promotion" rename column "created_at" to "start_date";`);

    this.addSql(`alter table "provider" add column "address" varchar(255) null, add column "phone" varchar(255) null, add column "email" varchar(255) null;`);

    this.addSql(`alter table "ingredient" rename column "name" to "description";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "supplier" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "name" varchar(255) not null, "contact_email" varchar(255) null, "phone" varchar(255) null, constraint "supplier_pkey" primary key ("id"));`);

    this.addSql(`alter table "promotion" drop column "end_date";`);

    this.addSql(`alter table "promotion" rename column "description" to "name";`);
    this.addSql(`alter table "promotion" rename column "discount" to "discount_percent";`);
    this.addSql(`alter table "promotion" rename column "start_date" to "created_at";`);

    this.addSql(`alter table "provider" drop column "address", drop column "phone", drop column "email";`);

    this.addSql(`alter table "ingredient" rename column "description" to "name";`);
  }

}
