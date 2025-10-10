import { Migration } from '@mikro-orm/migrations';

export class Migration20251010171704 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "product" add column "price" float not null default 0;');
    this.addSql('alter table "product" add column "image" varchar(255) null;');
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product" drop column "image", drop column "price";`);
  }

}
