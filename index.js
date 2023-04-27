import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import client from 'https';
import fs from 'fs';
import { useFirebase } from './services/useFirebase.js';
import { shortenString } from './utils/twitterCharacterLimit.js';
dotenv.config();

const generateNewImage = async () => {
  const uniqueRandom = Date.now() + Math.random();
  const randomIndex = Math.floor(uniqueRandom * 5425) % 5425;
  const randomData = await useFirebase(randomIndex.toString());
  return randomData;
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`)
        );
      }
    });
  });
};

const handleTweet = async () => {
  const twitterClient = new TwitterApi({
    appKey: process.env.CONSUMER_KEY ?? '',
    appSecret: process.env.CONSUMER_SECRET ?? '',
    accessToken: process.env.ACCESS_TOKEN ?? '',
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  });
  const tweetClient = twitterClient.readWrite;

  const image = await generateNewImage();
  const prompt = await shortenString(image.prompt, 280);
  await downloadImage(image.smallImage, './image.png');
  const upload = await tweetClient.v1.uploadMedia('./image.png');

  const resp = await tweetClient.v2.tweet(prompt, {
    media: {
      media_ids: [upload],
    },
  });
  if (resp.errors) {
    console.log('errors:', resp.errors);
  } else {
    console.log(
      `Successfully tweeted: ${image.smallImage} with description: ${prompt}`
    );
  }
  process.exit();
};

handleTweet()

















