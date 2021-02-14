import {Entity, ManyToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {User} from './User';

@Entity()
export class UserSubscription {

  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user: User | number;

  @Property()
  sub: string;


  constructor(user: User | number, sub: string) {
    this.user = user;
    this.sub = sub;
  }

}