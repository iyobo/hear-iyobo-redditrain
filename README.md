# hear-iyobo-redditrain

This is a reddit user feed-aggregator service.
it allows for:

- creating and updating users
- creating and updating a users favourite subredits
- setting the newsletter send out time for each user (default: 8am)
- Turning on and off the newsletter send out for a specific user
- Triggering the send of a newsletter to each respective users email at each users specified send out time (more on this in the section: "Our part")


TODO....


It makes the stats available for display from a REST API endpoint.

# SETUP
- Create your `.env` file, using `.env.example` as an example, then set your environmental variables in `.env`.
- Ensure you fill in your Tweeter dev keys in your `.env` file.
  ```
    TWITTER_CONSUMER_KEY=
    TWITTER_CONSUMER_SECRET=
    TWITTER_ACCESS_TOKEN=
    TWITTER_ACCESS_TOKEN_SECRET=
  ```
- Ensure you specify the text you intend to track on twitter in `.env`. For example, to track tweets pertaining to "banno"
  ```
    STREAM_TRACK=banno
  ```
- Run `yarn install` to initialize dependencies and dist folder. (This is important!)

# Running
- To run in dev mode, simply run `yarn dev`
- To run in Prod mode, `yarn start`
- To run tests, `yarn test`

# Displaying Stats
- This app launches an API that can be used to query for tweet stats. The default endpoint to see all stats is:
`GET http://localhost:3000/api/v1/stats`. You can change the port by setting the `PORT` env variable.
  
## API library
I used [koa-ts-controllers](https://github.com/iyobo/koa-ts-controllers) to define the REST endpoint. 
I created this library some time back to help developers quickly build REST APIs using typescript annotations.

### Endpoint/Response format
GET http://localhost:3000/api/v1/stats
```
{
    "tracking": "amazon",
    "general": {
        "totalTweets": 896,
        "avgTweetsPerSecond": 11.491894110404267
    },
    "urls": {
        "topDomains": [
            {
                "count": 117,
                "name": "twitter.com"
            },
            {
                "count": 20,
                "name": "amzn.to"
            },
            {
                "count": 19,
                "name": "www.amazon.co.jp"
            },
            {
                "count": 15,
                "name": "www.amazon.com"
            },
            {
                "count": 7,
                "name": "ow.ly"
            },
            {
                "count": 7,
                "name": "www.amazon.co.uk"
            },
            {
                "count": 6,
                "name": "music.amazon.co.jp"
            },
            {
                "count": 5,
                "name": "youtu.be"
            },
            {
                "count": 4,
                "name": "dlvr.it"
            },
            {
                "count": 3,
                "name": "www.silverdaggertours.com"
            }
        ],
        "percentTweetsWithURLs": 26.785714285714285,
        "percentTweetsWithPhotoURls": 0
    },
    "hashtags": {
        "topHashtags": [
            {
                "count": 128,
                "name": "原神"
            },
            {
                "count": 39,
                "name": "崩壊3rdエヴァコラボ"
            },
            {
                "count": 24,
                "name": "キャンペーン"
            },
            {
                "count": 22,
                "name": "バレンタイン"
            },
            {
                "count": 19,
                "name": "Amazonギフト券"
            },
            {
                "count": 18,
                "name": "気持ちをチョコッとLINEしよう"
            },
            {
                "count": 18,
                "name": "LINEギフト"
            },
            {
                "count": 17,
                "name": "プレゼント"
            },
            {
                "count": 11,
                "name": "RTキャンペーン"
            },
            {
                "count": 10,
                "name": "Amazon"
            }
        ]
    },
    "emojis": {
        "topEmojis": [
            {
                "count": 139,
                "name": "sparkles"
            },
            {
                "count": 136,
                "name": "gift"
            },
            {
                "count": 32,
                "name": "bangbang"
            },
            {
                "count": 24,
                "name": "tada"
            },
            {
                "count": 21,
                "name": "cupid"
            },
            {
                "count": 20,
                "name": "blush"
            },
            {
                "count": 17,
                "name": "green_heart"
            },
            {
                "count": 17,
                "name": "confetti_ball"
            },
            {
                "count": 16,
                "name": "exclamation"
            },
            {
                "count": 12,
                "name": "smile"
            }
        ],
        "percentTweetsWithEmojis": 22.098214285714285
    }
}
```

# Considerations
- This app currently uses an in-memory database storage strategy
  - This put a limit on how much it could be optimized for concurrency vs an external datasource e.g Redis
  - Nevertheless, this app was designed in such a way that these limitations can be easily overcome upon moving to an external datasource

- To keep the event loop unblocked, I used worker_threads.
  - Ideally, I would have liked to use a pool of multiple worker threads, but the lack of an external datasource makes it so I could only use one.
  
- Tests have been created for each tweet processor.

- Endpoints could be generated in the future for each stat.

