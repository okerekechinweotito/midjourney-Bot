import { database } from './firebaseConfig.js';
import { onValue, ref, child } from 'firebase/database';

const useFirebase = (dataKey) => {
  const databaseRef = ref(database);
  onValue(child(databaseRef, dataKey), (snapshot) => {
    const data = snapshot.val();
  });
};

export { useFirebase };

/* 
const useFirebase = () => {
  const databaseRef = ref(database);
  onValue(databaseRef, (snapshot) => {
    const dataObject = snapshot.val();

    const data = Object.keys(dataObject).map((key) => {
      return dataObject[key];
    });
    console.log(data);
  });
}; */
