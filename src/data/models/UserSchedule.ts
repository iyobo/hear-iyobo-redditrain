import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {User} from './User';

@Entity()
export class UserSchedule {

  @PrimaryKey()
  id: number;

  @OneToOne(() => User)
  user!: User | number;

  @Property()
  time: string;

  @Property()
  timezone: string;

  @Property()
  disabled: boolean;


  constructor(user: User | number, time: string, timezone: string) {
    this.user = user;
    this.time = time;
    this.timezone = timezone;
  }

}