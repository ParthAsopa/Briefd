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
      padding: '16px 16px 12px',
      borderBottom: '1px solid var(--surface2)',
      backgroundColor: 'rgba(8, 12, 20, 0.7)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 800, 
            color: 'var(--text)',
            letterSpacing: '-0.02em',
          }}>
            briefd
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span style={{ 
            fontSize: '12px', 
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}>
            {articleCount} stories · updated {timeStr}
          </span>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--surface2)',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              color: refreshing ? 'var(--text-muted)' : 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!refreshing) {
                e.target.style.background = 'var(--surface)';
                e.target.style.color = 'var(--text)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--surface2)';
              e.target.style.color = 'var(--accent)';
            }}
          >
            <RefreshCw
              size={14}
              style={{
                animation: refreshing ? 'spin 1s linear infinite' : 'none',
              }}
            />
            {refreshing ? 'Syncing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>
  );
}
