export default function SkeletonCard() {
  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      minHeight: '180px',
    }}>
      <div className="skeleton" style={{
        height: '20px',
        borderRadius: '8px',
        width: '40%',
      }} />
      <div className="skeleton" style={{
        height: '16px',
        borderRadius: '8px',
        width: '100%',
      }} />
      <div className="skeleton" style={{
        height: '16px',
        borderRadius: '8px',
        width: '95%',
      }} />
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
        <div className="skeleton" style={{
          height: '14px',
          borderRadius: '6px',
          width: '30%',
        }} />
        <div className="skeleton" style={{
          height: '14px',
          borderRadius: '6px',
          width: '25%',
        }} />
      </div>
    </div>
  );
}
