import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {User} from './User';

@Entity()
export class UserSchedule {

  @PrimaryKey()
  id: number;

  @OneToOne(() => User)
  user!: User | number;

  @Property()
  hour = 8;

  @Property()
  minute = 0;

  @Property()
  timezone = "America/Chicago";

  @Property()
  disabled = false;


  constructor(user: User | number, hour: number, minute: number, timezone: string) {
    this.user = user;
    this.hour = hour;
    this.minute = minute;
    this.timezone = timezone;
  }

}