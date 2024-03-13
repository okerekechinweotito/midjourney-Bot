import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import { useFirebase } from './api/useFirebase.js';
import { shortenString } from './utils/charLimit.js';
import { downloadImage } from './utils/downloadImage.js';
dotenv.config();

const handleTweet = async () => {
  const twitterClient = new TwitterApi({
    appKey: process.env.CONSUMER_KEY ?? '',
    appSecret: process.env.CONSUMER_SECRET ?? '',
    accessToken: process.env.ACCESS_TOKEN ?? '',
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  });
  const tweetClient = twitterClient.readWrite;

  const image = await useFirebase();
  await downloadImage(image?.smallImage || image?.bigImage, "./image.png");
  const prompt = await shortenString(image.prompt, 165);
  const upload = await tweetClient.v1.uploadMedia('./image.png');
  const tweetText = `${prompt} #midjourney #midjourneyart #stablediffusion #AIillustration #ai #aiart #aiartcommunity #aigenerated #bot`;

  const resp = await tweetClient.v2.tweet(tweetText, {
    media: {
      media_ids: [upload],
    },
  });
  if (resp.errors) {
    console.log('errors:', resp.errors);
  } else {
    console.log(
      `Successfully tweeted: ${image.smallImage} with descriptions: ${prompt}`
    );
  }
  process.exit();
};

handleTweet()

















