import { TwitterApi } from 'twitter-api-v2';
import { useFirebase } from './services/useFirebase.js';
import dotenv from 'dotenv';
dotenv.config();

const generateNewImage = async () => {
  const randomIndex = Math.floor(Math.random() * 5425);
  const randomData = await useFirebase(randomIndex.toString());
  return randomData;
};

const handleTweet = () => {
  const twitterClient = new TwitterApi({
    appKey: process.env.CONSUMER_KEY ?? '',
    appSecret: process.env.CONSUMER_SECRET ?? '',
    accessToken: process.env.ACCESS_TOKEN ?? '',
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  });
  const tweetClient = twitterClient.readWrite;

  // const image = generateNewImage();

  tweetClient.v2.tweet('Hello good world - bot');
};

handleTweet();
