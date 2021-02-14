import {Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {UserSubscription} from './UserSubscription';
import {UserSchedule} from './UserSchedule';

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName: string;

  @OneToOne(() => UserSchedule)
  schedule?: UserSchedule | number;

  @OneToMany(() => UserSubscription, (userSub: UserSubscription) => userSub.user)
  subreddits = new Collection<UserSubscription>(this);

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

}