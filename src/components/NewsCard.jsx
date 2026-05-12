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
        backgroundColor: isPlaying ? 'rgba(16, 185, 129, 0.08)' : 'var(--surface)',
        border: isPlaying ? '1px solid var(--accent)' : '1px solid var(--surface2)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovering ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovering 
          ? '0 12px 28px rgba(16, 185, 129, 0.15)' 
          : isPlaying 
            ? '0 8px 20px rgba(16, 185, 129, 0.1)' 
            : '0 2px 8px rgba(0, 0, 0, 0.3)',
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
          height: '3px',
          backgroundColor: 'var(--accent)',
          borderRadius: '0 0 3px 3px',
        }} />
      )}

      <div style={{ marginBottom: '8px' }}>
        <TagBadge tag={article.tag} />
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '8px',
      }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 600,
          lineHeight: 1.4,
          color: isPlaying ? 'var(--accent)' : 'var(--text)',
          flex: 1,
        }}>
          {article.headline}
        </h3>
        {hovering && (
          <ExternalLink 
            size={16} 
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
