export default function SkeletonCard() {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      minHeight: '200px',
    }}>
      <div className="skeleton" style={{
        height: '16px',
        borderRadius: '4px',
        width: '50%',
      }} />
      <div className="skeleton" style={{
        height: '18px',
        borderRadius: '4px',
        width: '100%',
        marginTop: '4px',
      }} />
      <div className="skeleton" style={{
        height: '18px',
        borderRadius: '4px',
        width: '95%',
      }} />
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
        <div className="skeleton" style={{
          height: '14px',
          borderRadius: '4px',
          width: '30%',
        }} />
        <div className="skeleton" style={{
          height: '14px',
          borderRadius: '4px',
          width: '25%',
        }} />
      </div>
    </div>
  );
}
