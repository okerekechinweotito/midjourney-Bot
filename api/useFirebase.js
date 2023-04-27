import { database } from './firebaseConfig.js';
import { get, ref, child } from 'firebase/database';

const fetchImage = async (dataKey) => {
  const databaseRef = ref(database);
  const snapshot = await get(child(databaseRef, dataKey));
  const data = snapshot.val();
  return data;
};

const useFirebase = async () => {
  const uniqueRandom = Date.now() + Math.random();
  const randomIndex = Math.floor(uniqueRandom * 5425) % 5425;
  const randomData = await fetchImage(randomIndex.toString());
  return randomData;
};

export { useFirebase };
