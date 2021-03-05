import { Migration } from '@mikro-orm/migrations';

export class Migration20210214101658 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user_schedule` rename column `time` to `hour`;');


    this.addSql('alter table `user_schedule` add column `minute` text null;');
  }

}
