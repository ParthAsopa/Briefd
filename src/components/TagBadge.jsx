const TAG_COLORS = {
  Breach: { bg: 'rgba(239, 68, 68, 0.12)', text: '#ff6b6b', border: 'rgba(239, 68, 68, 0.3)' },
  Exploit: { bg: 'rgba(249, 115, 22, 0.12)', text: '#ff8c42', border: 'rgba(249, 115, 22, 0.3)' },
  CVE: { bg: 'rgba(234, 179, 8, 0.12)', text: '#ffd700', border: 'rgba(234, 179, 8, 0.3)' },
  Ransomware: { bg: 'rgba(168, 85, 247, 0.12)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
  Tool: { bg: 'rgba(34, 197, 94, 0.12)', text: '#51cf66', border: 'rgba(34, 197, 94, 0.3)' },
  Malware: { bg: 'rgba(236, 72, 153, 0.12)', text: '#ff6b9d', border: 'rgba(236, 72, 153, 0.3)' },
  Phishing: { bg: 'rgba(244, 63, 94, 0.12)', text: '#ff6b6b', border: 'rgba(244, 63, 94, 0.3)' },
  Privacy: { bg: 'rgba(59, 130, 246, 0.12)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  Patch: { bg: 'rgba(20, 184, 166, 0.12)', text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.3)' },
  Other: { bg: 'rgba(100, 116, 139, 0.12)', text: '#94a3b8', border: 'rgba(100, 116, 139, 0.3)' },
};

export default function TagBadge({ tag }) {
  const colors = TAG_COLORS[tag] || TAG_COLORS.Other;
  return (
    <span style={{
      backgroundColor: colors.bg,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      borderRadius: '999px',
      padding: '4px 12px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      display: 'inline-block',
    }}>
      {tag}
    </span>
  );
}
