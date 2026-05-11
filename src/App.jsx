import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import NewsCard from './components/NewsCard';
import { refreshIfNeeded } from './lib/newsService';
import { getLastRefresh } from './lib/db';

const BREAKPOINTS = {
  default: 3,
  1024: 2,
  640: 1,
};

export default function App() {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await refreshIfNeeded();
      const last = await getLastRefresh();
      setArticles(data);
      setFiltered(data);
      setLastRefreshed(last);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (activeTag === 'All') {
      setFiltered(articles);
    } else {
      setFiltered(articles.filter(a => a.tag === activeTag));
    }
  }, [activeTag, articles]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Header articleCount={filtered.length} lastRefreshed={lastRefreshed} />
      <FilterBar active={activeTag} onChange={setActiveTag} />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          Fetching and summarizing today's stories...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          No stories found.
        </div>
      ) : (
        <Masonry
          breakpointCols={BREAKPOINTS}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {filtered.map((article, i) => (
            <NewsCard
              key={article.link}
              article={article}
              isPlaying={playingIndex === i}
            />
          ))}
        </Masonry>
      )}
    </div>
  );
}