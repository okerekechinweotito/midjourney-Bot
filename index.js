import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

const handleTweet = () => {
    const twitterClient = new TwitterApi({
        appKey: process.env.CONSUMER_KEY ?? '',
        appSecret: process.env.CONSUMER_SECRET ?? '',
        accessToken: process.env.ACCESS_TOKEN ?? '',
        accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
    });

    const tweetClient = twitterClient.readWrite;

    tweetClient.v2.tweet('Milliseconds since 01/01/1970: ' + Date.now());
};

handleTweet();
