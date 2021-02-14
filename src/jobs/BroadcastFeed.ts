import {orm} from '../data';
import {UserSchedule} from '../data/models/UserSchedule';

const CronJobManager = require('cron-job-manager');

class BroadCastFeed {

  manager: typeof CronJobManager;

  constructor() {
    this.manager = new CronJobManager();
  }

  async initJobs() {
    const jobRepo = orm.em.getRepository(UserSchedule);
    const jobs = await jobRepo.findAll();

    //start jobs for each
    jobs.forEach((it) => {
      this.manager.add(`u${it.id}`, `${it.minute} ${it.hour} * * *`, async () => {
        console.log(`Sending updates for user ${it.id}`)
      }, {
        start: true,
        timeZone: it.timezone
      });
    });


  }

  async addJob() {

  }

  async updateJob() {

  }
}

export const broadcastFeed = new BroadCastFeed();