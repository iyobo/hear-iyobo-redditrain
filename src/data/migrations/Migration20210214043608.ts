import { Migration } from '@mikro-orm/migrations';

export class Migration20210214043608 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user_subscription` rename column `subreddit` to `sub`;');
  }

}
