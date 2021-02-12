import {Entity, ManyToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {User} from './User';

@Entity()
export class UserSubreddit {

  @PrimaryKey()
  id!: number;

  @ManyToOne(()=> User)
  user: User;

  @Property()
  subreddit: string;


  constructor(user: User, subreddit: string) {
    this.user = user;
    this.subreddit = subreddit;
  }

}