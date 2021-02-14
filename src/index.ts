import dotenv from 'dotenv';
import {launchAPI} from './api/api';
import {initializeDatabase} from './data';
import {broadcastFeed} from './jobs/BroadcastFeed';

dotenv.config();

console.log('Initializing Hear-Iyobo RedditRain...');
(async function () {
  await initializeDatabase();
  await broadcastFeed.initJobs();
  await launchAPI();
})()
