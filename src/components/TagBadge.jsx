const TAG_COLORS = {
  Breach: { bg: '#1a0000', text: '#ff4444', border: '#330000' },
  Exploit: { bg: '#1a0a00', text: '#ff8844', border: '#332200' },
  CVE: { bg: '#1a1800', text: '#ffcc00', border: '#333300' },
  Ransomware: { bg: '#0a0a1a', text: '#bb88ff', border: '#1a1a33' },
  Tool: { bg: '#001a00', text: '#44ff44', border: '#003300' },
  Malware: { bg: '#1a000a', text: '#ff4488', border: '#330011' },
  Phishing: { bg: '#1a0505', text: '#ff5555', border: '#330a0a' },
  Privacy: { bg: '#000a1a', text: '#4488ff', border: '#001a33' },
  Patch: { bg: '#001a1a', text: '#44ffdd', border: '#003333' },
  Other: { bg: '#0a0a0f', text: '#999999', border: '#1a1a25' },
};

export default function TagBadge({ tag }) {
  const colors = TAG_COLORS[tag] || TAG_COLORS.Other;
  return (
    <span style={{
      backgroundColor: colors.bg,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      padding: '4px 10px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      display: 'inline-block',
    }}>
      {tag}
    </span>
  );
}
