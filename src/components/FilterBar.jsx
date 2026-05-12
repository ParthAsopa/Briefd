const TAGS = ['All', 'Breach', 'Exploit', 'CVE', 'Ransomware', 'Tool', 'Malware', 'Phishing', 'Privacy', 'Patch', 'Other'];

export default function FilterBar({ active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      padding: '16px 24px 20px',
      scrollbarWidth: 'none',
      borderBottom: '1px solid var(--border)',
      alignItems: 'center',
    }}>
      {TAGS.map(tag => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          style={{
            background: active === tag ? 'var(--accent)' : 'transparent',
            color: active === tag ? '#080c14' : 'var(--text)',
            border: active === tag ? '1px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: '6px',
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            boxShadow: active === tag ? '0 0 8px rgba(0, 216, 77, 0.2)' : 'none',
            flexShrink: 0,
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
