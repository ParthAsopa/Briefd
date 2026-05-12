const TAGS = ['All', 'Breach', 'Exploit', 'CVE', 'Ransomware', 'Tool', 'Malware', 'Phishing', 'Privacy', 'Patch', 'Other'];

export default function FilterBar({ active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      gap: 'clamp(8px, 2vw, 12px)',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px) clamp(16px, 3vw, 20px)',
      scrollbarWidth: 'none',
      borderBottom: '1px solid var(--border)',
      alignItems: 'center',
      WebkitOverflowScrolling: 'touch',
    }}>
      {TAGS.map(tag => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          style={{
            background: active === tag ? 'var(--accent)' : 'transparent',
            color: active === tag ? '#0a0a0a' : 'var(--text)',
            border: active === tag ? '1px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: '6px',
            padding: 'clamp(4px, 2vw, 8px) clamp(8px, 2.5vw, 14px)',
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            boxShadow: active === tag ? '0 0 8px rgba(0, 216, 77, 0.2)' : 'none',
            flexShrink: 0,
            minHeight: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
