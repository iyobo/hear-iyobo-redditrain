import { Migration } from '@mikro-orm/migrations';

export class Migration20210212153732 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user_subscription` (`id` integer not null primary key autoincrement, `subreddit` varchar not null);');

    this.addSql('alter table `user_subscription` add column `user_id` integer null;');
    this.addSql('create index `user_subscription_user_id_index` on `user_subscription` (`user_id`);');

    this.addSql('drop table if exists `user_subreddit`;');
  }

}
