import { Migration } from '@mikro-orm/migrations';

export class Migration20251014193500 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`ALTER TABLE "ingredient" ADD COLUMN "provider_id" uuid;`);
    this.addSql(`ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_provider_id_foreign" FOREIGN KEY ("provider_id") REFERENCES "provider" ("id") ON UPDATE CASCADE;`);
  }

  override async down(): Promise<void> {
    this.addSql(`ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_provider_id_foreign";`);
    this.addSql(`ALTER TABLE "ingredient" DROP COLUMN "provider_id";`);
  }
}
