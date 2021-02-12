import dotenv from 'dotenv';
import {launchAPI} from './api/api';
import {initializeDatabase} from './data';

dotenv.config();

console.log('Initializing Hear-Iyobo RedditRain...');
(async function () {
  await initializeDatabase();
  await launchAPI();
})()
