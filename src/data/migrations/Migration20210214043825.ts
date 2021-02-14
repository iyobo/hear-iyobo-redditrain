import { Migration } from '@mikro-orm/migrations';

export class Migration20210214043825 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index `user_schedule_id_unique`;');
    this.addSql('drop index `user_schedule_id_index`;');
    this.addSql('PRAGMA table_info(`user`);');
  }

}
