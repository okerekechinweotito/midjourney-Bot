/* import client from 'https';
import fs from 'fs';

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
        console.log({ filepath, url });
      }
    });
  });
};

export { downloadImage }; */

import puppeteer from 'puppeteer';
import fs from 'fs';
const downloadImage = async (url, filepath) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const viewSource = await page.goto(`${url}`, {
    waitUntil: 'domcontentloaded',
  });

  const scrapData = await page.evaluate(() => {
    const element = document.querySelector('body');
    const img = element.querySelector('img');
    const value = img.getAttribute('src');

    return value;
  });

  const buffer = await viewSource.buffer();

  fs.writeFile(`${filepath}`, buffer, () => {
    console.log('Image downloaded successfully!');
  });

  await browser.close();
};

export { downloadImage };
