import { TwitterApi } from 'twitter-api-v2';
import { useMidjourney } from './fetchMidjourney.js';
import dotenv from 'dotenv';
dotenv.config();

const generateNewImage = async () => {
  const dataPool = await useMidjourney();
  const randomIndex = Math.floor(Math.random() * dataPool.length);
  const randomData = await dataPool[randomIndex];
  console.log(randomData.prompt);
  return randomData;
};

generateNewImage();

const handleTweet = () => {
  const twitterClient = new TwitterApi({
    appKey: process.env.CONSUMER_KEY ?? '',
    appSecret: process.env.CONSUMER_SECRET ?? '',
    accessToken: process.env.ACCESS_TOKEN ?? '',
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  });
  const tweetClient = twitterClient.readWrite;

  const image = generateNewImage();

  tweetClient.v2.tweet(image.prompt);
};

handleTweet();
