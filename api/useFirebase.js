import { database } from './firebaseConfig.js';
import { get, ref, child, remove } from 'firebase/database';

const fetchImage = async (dataKey) => {
  const databaseRef = ref(database);
  const snapshot = await get(child(databaseRef, dataKey));
  const data = snapshot.val();
  await remove(child(databaseRef, dataKey));
  return data;
};

const useFirebase = async () => {
  const uniqueRandom = Date.now() + Math.random();
  const randomIndex = Math.floor(uniqueRandom * 5425) % 5425;
  const randomData = await fetchImage(randomIndex.toString());
  console.log(`database ref no - ${randomIndex}`);
  return randomData;
};

export { useFirebase };
