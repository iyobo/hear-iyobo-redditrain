import { Migration } from '@mikro-orm/migrations';

export class Migration20210212131056 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `first_name` varchar not null, `last_name` varchar not null);');

    this.addSql('create table `user_subreddit` (`id` integer not null primary key autoincrement, `subreddit` varchar not null);');

    this.addSql('create table `user_schedule` (`id` integer not null primary key autoincrement, `time` varchar not null, `timezone` varchar not null, `disabled` integer not null);');

    this.addSql('alter table `user` add column `schedule_id` integer null;');
    this.addSql('create index `user_schedule_id_index` on `user` (`schedule_id`);');
    this.addSql('create unique index `user_schedule_id_unique` on `user` (`schedule_id`);');

    this.addSql('alter table `user_subreddit` add column `user_id` integer null;');
    this.addSql('create index `user_subreddit_user_id_index` on `user_subreddit` (`user_id`);');

    this.addSql('alter table `user_schedule` add column `user_id` integer null;');
    this.addSql('create index `user_schedule_user_id_index` on `user_schedule` (`user_id`);');
    this.addSql('create unique index `user_schedule_user_id_unique` on `user_schedule` (`user_id`);');
  }

}
