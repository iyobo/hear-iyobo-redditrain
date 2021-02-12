import {Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {UserSubreddit} from './UserSubreddit';
import {UserSchedule} from './UserSchedule';

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName: string;

  @OneToOne()
  schedule?: UserSchedule;

  @OneToMany(() => UserSubreddit, (userSub: UserSubreddit) => userSub.user)
  subreddits = new Collection<UserSubreddit>(this);

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

}