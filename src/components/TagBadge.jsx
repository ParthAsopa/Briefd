const TAG_COLORS = {
  Breach: '#ef4444',
  Exploit: '#f97316',
  CVE: '#eab308',
  Ransomware: '#a855f7',
  Tool: '#22c55e',
  Malware: '#ec4899',
  Phishing: '#f43f5e',
  Privacy: '#3b82f6',
  Patch: '#14b8a6',
  Other: '#64748b',
};

export default function TagBadge({ tag }) {
  const color = TAG_COLORS[tag] || TAG_COLORS.Other;
  return (
    <span style={{
      backgroundColor: color + '22',
      color: color,
      border: `1px solid ${color}44`,
      borderRadius: '999px',
      padding: '2px 10px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    }}>
      {tag}
    </span>
  );
}