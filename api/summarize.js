const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const TAGS = ['Breach', 'Exploit', 'CVE', 'Ransomware', 'Tool', 'Malware', 'Phishing', 'Privacy', 'Patch', 'Other'];

export default async function handler(req, res) {
  console.log('API KEY EXISTS:', !!process.env.GROQ_API_KEY);
  console.log('API KEY PREFIX:', process.env.GROQ_API_KEY?.slice(0, 8));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { articles } = req.body;

  if (!articles || !articles.length) {
    return res.status(400).json({ error: 'No articles provided' });
  }

  try {
    const summarized = await Promise.all(
      articles.map(async (article) => {
        const prompt = `
You are summarizing a cybersecurity news article for a student who prefers audio over reading.

Article title: ${article.title}
Article content: ${article.summary}

Respond ONLY with a JSON object in this exact format, no extra text:
{
  "headline": "rewritten title in plain casual English, max 10 words",
  "summary": "2-3 sentence explanation of what happened, written like a friend explaining it, no jargon",
  "tag": "pick exactly one from: ${TAGS.join(', ')}"
}`;

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

        const data = await response.json();
        const raw = data.choices?.[0]?.message?.content || '{}';
        console.log('RAW GROQ RESPONSE:', raw);

        let parsed;
        try {
          const clean = raw
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
          parsed = JSON.parse(clean);
        } catch {
          parsed = {
            headline: article.title,
            summary: article.summary?.slice(0, 200) || '',
            tag: 'Other'
          };
        }

        return {
          ...article,
          headline: parsed.headline || article.title,
          summary: parsed.summary || article.summary,
          tag: parsed.tag || 'Other',
        };
      })
    );

    res.status(200).json({ articles: summarized });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}