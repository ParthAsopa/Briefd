import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import TagBadge from './TagBadge';

export default function NewsCard({ article, isPlaying }) {
  const [hovering, setHovering] = useState(false);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (h >= 24) return `${Math.floor(h / 24)}d ago`;
    if (h >= 1) return `${h}h ago`;
    return `${m}m ago`;
  };

  return (
    <div 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: isPlaying ? '1px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: '8px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isPlaying ? '0 0 12px rgba(0, 216, 77, 0.15)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => window.open(article.link, '_blank')}
    >
      {isPlaying && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--accent)',
        }} />
      )}

      <div style={{ marginBottom: '12px' }}>
        <TagBadge tag={article.tag} />
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '12px',
      }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 600,
          lineHeight: 1.4,
          color: 'var(--text)',
          flex: 1,
          margin: 0,
        }}>
          {article.headline}
        </h3>
        {hovering && (
          <ExternalLink 
            size={14} 
            style={{
              color: 'var(--accent)',
              flexShrink: 0,
              marginTop: '2px',
            }} 
          />
        )}
      </div>

      <p style={{
        fontSize: '13px',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        marginBottom: '16px',
        marginTop: '8px',
      }}>
        {article.summary}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: 'var(--text-muted)',
      }}>
        <span>{article.source}</span>
        <span>{timeAgo(article.publishedAt)}</span>
      </div>
    </div>
  );
}
