import {Body, Controller, Delete, Get, Params, Post, Put} from 'koa-ts-controllers';
import {forkEntityManager} from '../../data';
import {User} from '../../data/models/User';
import {CreateUserParams, UpdateScheduleParams, UpdateSubParams, UpdateUserParams} from '../types';
import {UserSubscription} from '../../data/models/UserSubscription';
import {UserSchedule} from '../../data/models/UserSchedule';
import {userFeedJob} from '../../jobs/UserFeedJob';

@Controller('/user')
export class UserController {

  @Get('/')
  async getUsers(): Promise<User[]> {
    const em = forkEntityManager();
    const users = em.getRepository(User);

    return users.findAll();
  }

  @Post('/')
  async createUser(@Body({required: true}) input: CreateUserParams) {
    const em = forkEntityManager();

    const user = new User(input.firstName, input.lastName);

    // subreddits
    input.subs?.forEach((it) => user.subreddits.add(new UserSubscription(user, it)));


    // schedule
    const schedule = new UserSchedule(user, input.hour, input.minute, input.timezone);

    await em.persistAndFlush([user, schedule]);
    return user;
  }

  @Get('/:userId')
  async getUser(@Params('userId') userId: number): Promise<User> {
    const em = forkEntityManager();
    const users = em.getRepository(User);

    return users.findOne({id: userId});
  }

  @Put('/:userId')
  async updateUser(@Params('userId') userId: number, @Body() body: UpdateUserParams): Promise<User[]> {
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

    await repo.nativeUpdate({user: userId}, body);
    const job = await repo.findOne({id: userId});

    return await userFeedJob.upsertJob(job)

  }

}