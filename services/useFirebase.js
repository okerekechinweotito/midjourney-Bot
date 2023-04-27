import { database } from './firebaseConfig.js';
import { get, ref, child } from 'firebase/database';

const useFirebase = async (dataKey) => {
  const databaseRef = ref(database);
  const snapshot = await get(child(databaseRef, dataKey));
  const data = snapshot.val();
  return data;
};

export { useFirebase };
