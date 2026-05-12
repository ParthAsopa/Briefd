import { RefreshCw } from 'lucide-react';

export default function Header({ articleCount, lastRefreshed, onRefresh, refreshing }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '20px 24px',
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg)',
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: '24px',
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          briefd
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'flex-end' }}>
          <span style={{ 
            fontSize: '13px', 
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}>
            {articleCount} stories
          </span>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--accent)',
            fontSize: '12px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
            }} />
            System Online
          </div>

          <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '6px 12px',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
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
