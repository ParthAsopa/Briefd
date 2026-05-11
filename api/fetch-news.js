import Parser from 'rss-parser';

const parser = new Parser();

const FEEDS = [
  'https://www.securityweek.com/feed/',
  'https://feeds.feedburner.com/TheHackersNews',
  'https://cybersecuritynews.com/feed/',
  'https://www.infosecurity-magazine.com/rss/news/',
  'https://www.darkreading.com/rss.xml',
  'https://www.bleepingcomputer.com/feed/',
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const results = await Promise.allSettled(
      FEEDS.map(url => parser.parseURL(url))
    );

    const articles = [];

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const feed = result.value;
        feed.items.slice(0, 10).forEach((item) => {
          articles.push({
            title: item.title || '',
            summary: item.contentSnippet || item.content || '',
            link: item.link || '',
            source: feed.title || '',
            publishedAt: item.pubDate || item.isoDate || '',
          });
        });
      }
    });

    // sort by date, newest first
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}