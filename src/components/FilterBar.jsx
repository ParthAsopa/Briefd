const TAGS = ['All', 'Breach', 'Exploit', 'CVE', 'Ransomware', 'Tool', 'Malware', 'Phishing', 'Privacy', 'Patch', 'Other'];

export default function FilterBar({ active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      padding: '0 16px 12px',
      scrollbarWidth: 'none',
    }}>
      {TAGS.map(tag => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          style={{
            background: active === tag ? 'var(--accent)' : 'var(--surface2)',
            color: active === tag ? '#080c14' : 'var(--text-muted)',
            border: active === tag ? '1px solid var(--accent)' : '1px solid transparent',
            borderRadius: '999px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            boxShadow: active === tag ? '0 0 16px rgba(16, 185, 129, 0.3)' : 'none',
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
