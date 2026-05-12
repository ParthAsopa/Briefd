import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import NewsCard from './components/NewsCard';
import AudioPlayer from './components/AudioPlayer';
import { refreshIfNeeded } from './lib/newsService';
import { getLastRefresh, clearLastRefresh } from './lib/db';
import { initAudio } from './lib/audioService';

const BREAKPOINTS = {
  default: 3,
  1024: 2,
  640: 1,
};


export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [audioState, setAudioState] = useState('stopped');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await refreshIfNeeded();
      const last = await getLastRefresh();
      setArticles(data);
      setFiltered(data);
      setLastRefreshed(last);
      setLoading(false);

      initAudio({
        items: data,
        onArticle: (index) => setPlayingIndex(index),
        onDone: () => {
          setPlayingIndex(null);
          setAudioState('stopped');
        },
        onState: (state) => setAudioState(state),
      });
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

  // scroll to playing card
  useEffect(() => {
    if (playingIndex === null) return;
    const el = document.getElementById(`card-${playingIndex}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [playingIndex]);

  async function handleRefresh() {
    setRefreshing(true);
    await clearLastRefresh();
    const data = await refreshIfNeeded();
    const last = await getLastRefresh();
    setArticles(data);
    setFiltered(data);
    setLastRefreshed(last);
    initAudio({
      items: data,
      onArticle: (index) => setPlayingIndex(index),
      onDone: () => { setPlayingIndex(null); setAudioState('stopped'); },
      onState: (state) => setAudioState(state),
    });
    setRefreshing(false);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', paddingBottom: '80px' }}>
      <Header
  articleCount={filtered.length}
  lastRefreshed={lastRefreshed}
  onRefresh={handleRefresh}
  refreshing={refreshing}
/>
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
            <div id={`card-${i}`} key={article.link}>
              <NewsCard
                article={article}
                isPlaying={playingIndex === i}
              />
            </div>
          ))}
        </Masonry>
      )}

      <AudioPlayer
        state={audioState}
        currentIndex={playingIndex}
        totalArticles={filtered.length}
      />
    </div>
  );
}