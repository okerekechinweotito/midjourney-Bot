import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD-fydzUEb67wFosx_tF9TTyVTSbSeiYtM',
  authDomain: 'midjourney--bot.firebaseapp.com',
  databaseURL: 'https://midjourney--bot-default-rtdb.firebaseio.com',
  projectId: 'midjourney--bot',
  storageBucket: 'midjourney--bot.appspot.com',
  messagingSenderId: '3976629867',
  appId: '1:3976629867:web:b146e78be7ad5912b02b2e',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
