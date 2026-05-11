import { openDB } from 'idb';

const DB_NAME = 'briefd';
const DB_VERSION = 1;
const STORE_NAME = 'articles';
const META_STORE = 'meta';

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'link' });
        store.createIndex('publishedAt', 'publishedAt');
        store.createIndex('tag', 'tag');
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE);
      }
    },
  });
}

// Save articles to IndexedDB
export async function saveArticles(articles) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await Promise.all(articles.map(article => tx.store.put(article)));
  await tx.done;
}

// Get all articles, newest first
export async function getArticles() {
  const db = await getDB();
  const all = await db.getAllFromIndex(STORE_NAME, 'publishedAt');
  return all.reverse();
}

// Get articles filtered by tag
export async function getArticlesByTag(tag) {
  const db = await getDB();
  return db.getAllFromIndex(STORE_NAME, 'tag', tag);
}

// Save last refresh timestamp
export async function setLastRefresh(timestamp) {
  const db = await getDB();
  await db.put(META_STORE, timestamp, 'lastRefresh');
}

// Get last refresh timestamp
export async function getLastRefresh() {
  const db = await getDB();
  return db.get(META_STORE, 'lastRefresh');
}

// Check if refresh is needed (every 2 hours)
export async function needsRefresh() {
  const last = await getLastRefresh();
  if (!last) return true;
  const twoHours = 2 * 60 * 60 * 1000;
  return Date.now() - last > twoHours;
}