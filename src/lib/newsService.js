import { saveArticles, getArticles, setLastRefresh, needsRefresh } from './db';

export async function refreshIfNeeded() {
  const should = await needsRefresh();
  if (!should) return getArticles();

  try {
    // Step 1: fetch raw articles
    const fetchRes = await fetch('/api/fetch-news');
    const { articles: raw } = await fetchRes.json();

    // Step 2: summarize them
    const summarizeRes = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articles: raw }),
    });
    const { articles: summarized } = await summarizeRes.json();

    // Step 3: save to IndexedDB
    await saveArticles(summarized);
    await setLastRefresh(Date.now());

    return summarized;
  } catch (error) {
    console.error('Refresh failed, loading from cache:', error);
    return getArticles();
  }
}

export { getArticles, getArticlesByTag } from './db';