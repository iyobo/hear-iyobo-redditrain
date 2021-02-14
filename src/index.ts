import dotenv from 'dotenv';
dotenv.config();
import {launchAPI} from './api/api';
import {initializeDatabase} from './data';
import {userFeedJob} from './jobs/UserFeedJob';
import {initializeReddit} from './util/reddit';


console.log('Initializing Hear-Iyobo RedditRain...');
(async function () {
  try {
    await initializeDatabase();
    await initializeReddit();
    await userFeedJob.initJobs();
    await launchAPI();
  }
  catch(err){
    console.error('[Launch Error] Could not start Service: ',err)
  }
})()
