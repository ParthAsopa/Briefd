import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import TagBadge from './TagBadge';

const TAG_COLORS = {
  Breach: '#ff4444',
  Exploit: '#ff8844',
  CVE: '#ffcc00',
  Ransomware: '#bb88ff',
  Tool: '#44ff44',
  Malware: '#ff4488',
  Phishing: '#ff5555',
  Privacy: '#4488ff',
  Patch: '#44ffdd',
  Other: '#999999',
};

export default function NewsCard({ article, isPlaying }) {
  const [hovering, setHovering] = useState(false);
  const tagColor = TAG_COLORS[article.tag] || TAG_COLORS.Other;

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
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '20px',
        paddingLeft: '18px',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: hovering 
          ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
          : '0 2px 8px rgba(0, 0, 0, 0.2)',
        transform: hovering ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => window.open(article.link, '_blank')}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '2px',
        backgroundColor: tagColor,
      }} />

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
