import Reddit from 'reddit';
import {FeedItem} from '../types';

export let reddit;
let initialized = false;

export async function initializeReddit() {
  console.log('Initializing Reddit client...');
  reddit = new Reddit({
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
    appId: process.env.REDDIT_APP_ID,
    appSecret: process.env.REDDIT_APP_SECRET,
    // userAgent: 'MyApp/1.0.0 (http://example.com)'
  });

  // test reddit connection
  await reddit.get('/r/javascript/top.json');
  initialized = true;

  //Test endpoint to ensure credentials work
  return await reddit.get(`/api/v1/me`);
}

export async function getSubredditTop(subReddit: string, limit: number) {
  if (!initialized) throw new Error('Reddit is not yet initialized...');

  const res = await reddit.get(`/${subReddit}/top.json`);

  const top: FeedItem[] = [];
  res?.data?.children?.forEach(({data}) => {
    if (data) {
      top.push({
        id: data.id,
        title: data.title,
        url: data.permalink,
        imageUrl: data.thumbnail,
        score: data.score
      });
    }
  });

  const srData = {name: subReddit, top}
  return srData;
}