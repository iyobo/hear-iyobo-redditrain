import {Body, Controller, Delete, Get, Params, Post, Put} from 'koa-ts-controllers';
import {forkEntityManager} from '../../data';
import {User} from '../../data/models/User';
import {CreateUserParams, UpdateScheduleParams, UpdateSubParams, UpdateUserParams} from '../types';
import {UserSubscription} from '../../data/models/UserSubscription';
import {UserSchedule} from '../../data/models/UserSchedule';

@Controller('/user')
export class UserController {

  @Get('/')
  async getUsers() {
    const em = forkEntityManager();
    const users = em.getRepository(User);

    return users.findAll();
  }

  @Post('/')
  async createUser(@Body({required: true}) body: CreateUserParams) {
    const em = forkEntityManager();

    const user = new User(body.firstName, body.lastName);

    // subreddits
    body.subs?.forEach((it) => user.subreddits.add(new UserSubscription(user, it)));


    // schedule
    const schedule = new UserSchedule(user, body.time, body.timezone);

    await em.persistAndFlush([user, schedule]);
    return user;
  }

  @Put('/:userId')
  async updateUser(@Params('userId') userId: number, @Body() body: UpdateUserParams) {
    const em = forkEntityManager();
    const users = em.getRepository(User);

    await users.nativeUpdate({id: userId}, body);

    return users.findAll();
  }

  @Post('/:userId/sub')
  async createUserSubreddit(@Body() body: UpdateSubParams, @Params('userId') userId: number) {
    const em = forkEntityManager();
    const subs = em.getRepository(UserSubscription);
    return await subs.nativeInsert({user: userId, sub: body.name});
  }

  @Delete('/:userId/sub/:subId')
  async deleteUserSubreddit(@Params() userId: number) {
    const em = forkEntityManager();
    const subs = em.getRepository(UserSubscription);
    return await subs.nativeDelete({user: userId});
  }

  @Get('/subs')
  async getSubscriptions() {
    const em = forkEntityManager();

    return em.find(UserSubscription, {});
  }

  @Get('/schedules')
  async getSchedules() {
    const em = forkEntityManager();

    return em.find(UserSchedule, {});
  }

  @Put('/:userId/schedule')
  async updateUserSchedule(
    @Body() body: UpdateScheduleParams,
    @Params('userId') userId: number
  ) {
    const em = forkEntityManager();
    const repo = em.getRepository(UserSchedule);

    return await repo.nativeUpdate({user: userId}, body);
  }

}