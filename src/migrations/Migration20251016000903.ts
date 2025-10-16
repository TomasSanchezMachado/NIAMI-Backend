import { Migration } from '@mikro-orm/migrations';

export class Migration20251016000903 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "order" drop constraint "order_user_id_foreign";`);

    this.addSql(`alter table "order_item" drop constraint "order_item_order_id_foreign";`);

  this.addSql(`alter table "category" add column "updated_at" date not null default now();`);

  this.addSql(`alter table "product" add column "created_at" date not null default now(), add column "updated_at" date not null default now();`);

  this.addSql(`alter table "promotion" add column "created_at" date not null default now(), add column "updated_at" date not null default now();`);

  this.addSql(`alter table "provider" add column "updated_at" date not null default now();`);

  this.addSql(`alter table "ingredient" add column "created_at" date not null default now(), add column "updated_at" date not null default now();`);

  this.addSql(`alter table "user" add column "created_at" date not null default now(), add column "updated_at" date not null default now(), add column "address" varchar(255) null, add column "phone" varchar(255) null;`);
    this.addSql(`alter table "user" alter column "id" drop default;`);
    this.addSql(`alter table "user" alter column "id" type uuid using ("id"::text::uuid);`);

  this.addSql(`alter table "order" add column "updated_at" date not null default now(), add column "description" varchar(255) null, add column "total_price" real not null default 0;`);
    this.addSql(`alter table "order" alter column "id" drop default;`);
    this.addSql(`alter table "order" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "order" alter column "user_id" drop default;`);
    this.addSql(`alter table "order" alter column "user_id" type uuid using ("user_id"::text::uuid);`);
    this.addSql(`alter table "order" alter column "created_at" type date using ("created_at"::date);`);
    this.addSql(`alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

  this.addSql(`alter table "order_item" add column "created_at" date not null default now(), add column "updated_at" date not null default now(), add column "description" varchar(255) null, add column "price" real not null default 0;`);
    this.addSql(`alter table "order_item" alter column "id" drop default;`);
    this.addSql(`alter table "order_item" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "order_item" alter column "order_id" drop default;`);
    this.addSql(`alter table "order_item" alter column "order_id" type uuid using ("order_id"::text::uuid);`);
    this.addSql(`alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "order" alter column "id" type text using ("id"::text);`);
    this.addSql(`alter table "order" alter column "user_id" type text using ("user_id"::text);`);

    this.addSql(`alter table "order" drop constraint "order_user_id_foreign";`);

    this.addSql(`alter table "order_item" alter column "id" type text using ("id"::text);`);
    this.addSql(`alter table "order_item" alter column "order_id" type text using ("order_id"::text);`);

    this.addSql(`alter table "order_item" drop constraint "order_item_order_id_foreign";`);

    this.addSql(`alter table "category" drop column "updated_at";`);

    this.addSql(`alter table "product" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "promotion" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "provider" drop column "updated_at";`);

    this.addSql(`alter table "ingredient" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "user" drop column "created_at", drop column "updated_at", drop column "address", drop column "phone";`);

    this.addSql(`alter table "user" alter column "id" type varchar(255) using ("id"::varchar(255));`);

    this.addSql(`alter table "order" drop column "updated_at", drop column "description", drop column "total_price";`);

    this.addSql(`alter table "order" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "order" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "order" alter column "user_id" type varchar(255) using ("user_id"::varchar(255));`);
    this.addSql(`alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "order_item" drop column "created_at", drop column "updated_at", drop column "description", drop column "price";`);

    this.addSql(`alter table "order_item" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "order_item" alter column "order_id" type varchar(255) using ("order_id"::varchar(255));`);
    this.addSql(`alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;`);
  }

}
