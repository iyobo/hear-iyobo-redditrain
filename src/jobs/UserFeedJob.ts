import {orm} from '../data';
import {UserSchedule} from '../data/models/UserSchedule';
import {JobManager} from './types';
import {inspect} from 'util';
import {UserSubscription} from '../data/models/UserSubscription';
import {getSubredditTop} from '../util/reddit';
import {User} from '../data/models/User';

const CronJobManager = require('cron-job-manager');

const FEED_LIMIT = 3;

class UserFeedJob implements JobManager<UserSchedule> {

  manager: typeof CronJobManager;

  constructor() {
    this.manager = new CronJobManager();
  }

  _addJob(schedule: UserSchedule) {
    const id = 'u' + schedule.id;

    this.manager.add(id, `${schedule.minute} ${schedule.hour} * * *`, async () => {
      try {
        console.log(`Sending updates for user ${schedule.id}...`);
        const em = orm.em;

        // pull subscriptions
        const subs = await em.find(UserSubscription, {user: schedule.user});

        // pull feed from reddit for subs
        const items = await Promise.all(subs.map(it => getSubredditTop(it.sub, FEED_LIMIT)));

        const user: User = await em.findOne(User, {id: schedule.user as number});

        const payload = {
          name: user.firstName,
          items
        };
        console.log(`Sending Top ${FEED_LIMIT} subreddit threads for user ${schedule.user}`, payload);
      }catch(err){
        console.error('[JOB ERROR]', err)
      }

    }, {
      start: !schedule.disabled,
      timeZone: schedule.timezone
    });
  }

  async initJobs() {
    console.log('Initializing Broadcast feed jobs...');
    const jobRepo = orm.em.getRepository(UserSchedule);
    const jobs = await jobRepo.findAll();

    //start jobs for each
    jobs.forEach((it) => {
      this._addJob(it);
    });

    const jobList = this.manager.listCrons();
    console.log(`Loaded Broadcast feed jobs: \n ${jobList}`);
    return jobList;

  }

  async upsertJob(schedule: UserSchedule) {
    this._addJob(schedule);

    const jobStats = this.manager.jobs['u' + schedule.id]?.cronTime;
    console.debug(`Job u${schedule.id} updated: \n ${inspect(jobStats, false, 1, true)}`);
    return jobStats;

  }
}

export const userFeedJob = new UserFeedJob();