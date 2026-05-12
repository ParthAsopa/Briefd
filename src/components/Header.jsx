import { RefreshCw } from 'lucide-react';

export default function Header({ articleCount, lastRefreshed, onRefresh, refreshing }) {
  const timeStr = lastRefreshed
    ? new Date(lastRefreshed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Never';

  return (
    <div style={{
      padding: '20px 16px 12px',
      borderBottom: '1px solid var(--surface2)',
      marginBottom: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent)' }}>
          briefd
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {articleCount} stories · refreshed {timeStr}
          </span>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--surface2)',
              borderRadius: '8px',
              padding: '6px 8px',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              color: refreshing ? 'var(--text-muted)' : 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <RefreshCw
              size={14}
              style={{
                animation: refreshing ? 'spin 1s linear infinite' : 'none',
              }}
            />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>
  );
}