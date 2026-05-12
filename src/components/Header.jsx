import { RefreshCw } from 'lucide-react';

export default function Header({ articleCount, lastRefreshed, onRefresh, refreshing }) {
  const timeStr = lastRefreshed
    ? new Date(lastRefreshed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Never';

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: 'clamp(12px, 4vw, 20px) clamp(16px, 5vw, 24px)',
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg)',
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: 'clamp(12px, 3vw, 24px)',
      }}>
        <h1 style={{ 
          fontSize: 'clamp(16px, 5vw, 20px)', 
          fontWeight: 600, 
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          briefd
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)', flex: 1, justifyContent: 'flex-end', minWidth: 0 }}>
          <span style={{ 
            fontSize: 'clamp(11px, 3vw, 13px)', 
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {articleCount} stories · updated {timeStr}
          </span>

          <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: 'clamp(4px, 2vw, 6px) clamp(8px, 2.5vw, 12px)',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(4px, 1.5vw, 6px)',
              fontSize: 'clamp(10px, 2.5vw, 12px)',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!refreshing) {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.color = 'var(--accent)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.color = 'var(--text)';
            }}
          >
            <RefreshCw
              size={12}
              style={{
                animation: refreshing ? 'spin 1s linear infinite' : 'none',
              }}
            />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
