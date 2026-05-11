import TagBadge from './TagBadge';

export default function NewsCard({ article, isPlaying }) {
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (h >= 24) return `${Math.floor(h / 24)}d ago`;
    if (h >= 1) return `${h}h ago`;
    return `${m}m ago`;
  };

  return (
    <div style={{
      backgroundColor: isPlaying ? '#1e3a5f' : 'var(--surface)',
      border: isPlaying ? '1px solid var(--accent)' : '1px solid transparent',
      borderRadius: 'var(--radius)',
      padding: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
      onClick={() => window.open(article.link, '_blank')}
    >
      <div style={{ marginBottom: '8px' }}>
        <TagBadge tag={article.tag} />
      </div>
      <h3 style={{
        fontSize: '15px',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '8px',
        color: isPlaying ? 'var(--accent)' : 'var(--text)',
      }}>
        {article.headline}
      </h3>
      <p style={{
        fontSize: '13px',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        marginBottom: '12px',
      }}>
        {article.summary}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: 'var(--text-muted)',
      }}>
        <span>{article.source}</span>
        <span>{timeAgo(article.publishedAt)}</span>
      </div>
    </div>
  );
}