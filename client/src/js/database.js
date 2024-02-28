import { openDB } from 'idb';

// Define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/*
  Add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  // Create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps
  const jate_var = await openDB(DB_NAME, 1);

  const jate_tx = jate_var.transaction(DB_NAME, 'readwrite');

  const jate_store = jate_tx.objectStore(DB_NAME);

  const request = jate_store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result?.value);
};

/*
Get all content from IndexedDB.
*/
export const getDb = async () => {
  //same as above except 'readonly'

  const jate_var = await openDB(DB_NAME, 1);
  const jate_tx = jate_var.transaction(DB_NAME, 'readonly');
  const jate_store = jate_tx.objectStore(DB_NAME);

  const request = jate_store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
