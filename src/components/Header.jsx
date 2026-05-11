export default function Header({ articleCount, lastRefreshed }) {
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
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {articleCount} stories · refreshed {timeStr}
        </span>
      </div>
    </div>
  );
}