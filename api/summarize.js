export const config = {
  runtime: 'nodejs'
};

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const TAGS = ['Breach', 'Exploit', 'CVE', 'Ransomware', 'Tool', 'Malware', 'Phishing', 'Privacy', 'Patch', 'Other'];

async function summarizeOne(article) {
  const prompt = `You are summarizing a cybersecurity news article for a student who prefers audio over reading.

Article title: ${article.title}
Article content: ${article.summary?.slice(0, 500) || ''}

Respond ONLY with a JSON object, no markdown, no code fences, no extra text:
{"headline":"rewritten title in plain casual English max 10 words","summary":"2-3 sentences explaining what happened like a friend no jargon","tag":"pick exactly one from: ${TAGS.join(', ')}"}`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.log('GROQ ERROR:', err);
    return null;
  }

  const data = await response.json();
  console.log('GROQ DATA:', JSON.stringify(data).slice(0, 200));
  const raw = data.choices?.[0]?.message?.content || '{}';

  try {
    const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    console.log('PARSE FAIL:', raw);
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { articles } = req.body;
  if (!articles?.length) return res.status(400).json({ error: 'No articles provided' });

  // limit to 20 to avoid timeout
  const limited = articles.slice(0, 20);

  const summarized = await Promise.all(
    limited.map(async (article) => {
      const parsed = await summarizeOne(article);
      return {
        ...article,
        headline: parsed?.headline || article.title,
        summary: parsed?.summary || article.summary,
        tag: parsed?.tag || 'Other',
      };
    })
  );

  res.status(200).json({ articles: summarized });
}