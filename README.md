# briefd

> Your personal audio cybersecurity news briefing.

Briefd is a PWA that fetches the latest cybersecurity news from 6 major sources, summarizes each story in plain English using AI, and reads them out to you — so you stay informed without having to read a single article.

---

## Why

Staying current in cybersecurity means consuming a lot of news. Briefd is built for people who learn better by listening than reading — it turns your daily security news into a generated audio briefing you can play like a podcast, updated automatically every 2 hours.

---

## Features

- 🎧 **Audio briefing** — hit play and listen to today's top stories read aloud
- 🃏 **Pinterest-style card grid** — stories displayed as scannable cards that highlight as they play
- 🏷️ **Auto-tagging** — each story is categorized as Breach, Exploit, CVE, Ransomware, Tool, Malware, Phishing, Privacy, Patch, or Other
- 🤖 **AI summarization** — Groq (Llama 3.3) rewrites every headline and summary in casual plain English
- 📡 **6 news sources** — SecurityWeek, The Hacker News, CyberSecurity News, Infosecurity Magazine, Dark Reading, Bleeping Computer
- ⚡ **Auto-refresh** — fetches and summarizes new stories every 2 hours in the background
- 📦 **Offline support** — cached stories load instantly even without internet
- 📱 **Installable** — works as a native-feeling app on Android and desktop via PWA

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| PWA | vite-plugin-pwa + Workbox |
| Backend | Vercel Serverless Functions |
| AI Summarization | Groq API (Llama 3.3 70B) |
| News Sources | RSS feeds via rss-parser |
| Local Storage | IndexedDB via idb |
| Audio | Web Speech API (built-in, free) |
| Hosting | Vercel (free tier) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com)
- A [Vercel account](https://vercel.com) (free)

### Installation

```bash
# Clone the repo
git clone https://github.com/ParthAsopa/briefd.git
cd briefd

# Install dependencies
npm install

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project and set up environment
vercel

# Add your Groq API key
vercel env add GROQ_API_KEY production
vercel env add GROQ_API_KEY preview
vercel env add GROQ_API_KEY development

# Pull env variables locally
vercel env pull .env.local
```

### Running Locally

```bash
vercel dev
```

App will be available at `http://localhost:3000`

### Deploy

```bash
git push
```

Vercel auto-deploys on every push to main.

---

## Project Structure

```
briefd/
├── api/
│   ├── fetch-news.js       # Serverless function — fetches RSS feeds
│   └── summarize.js        # Serverless function — Groq AI summarization
├── public/
│   ├── favicon.ico
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx  # Fixed bottom audio controls
│   │   ├── FilterBar.jsx    # Tag filter buttons
│   │   ├── Header.jsx       # App header with story count
│   │   ├── NewsCard.jsx     # Individual story card
│   │   └── TagBadge.jsx     # Colored category badge
│   ├── lib/
│   │   ├── audioService.js  # Web Speech API wrapper
│   │   ├── db.js            # IndexedDB operations
│   │   └── newsService.js   # Fetch + cache orchestration
│   ├── App.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── vercel.json
```

---

## Installing on Android

1. Open your Vercel deployment URL in Chrome
2. Tap the three-dot menu
3. Tap **Add to Home screen**
4. Launch like any other app — runs fullscreen, works offline

---

## Roadmap

- [ ] Interest selection — choose your own topics beyond cybersecurity
- [ ] More news sources
- [ ] Playback speed control
- [ ] Voice selection
- [ ] Notification when new stories are available
- [ ] Dark/light theme toggle

---

## License

GNU Affero General Public License v3.0 — see [LICENSE](LICENSE) for details.

---

## Acknowledgements

Built with [Groq](https://groq.com), [Vercel](https://vercel.com), and the Web Speech API.
News sourced from SecurityWeek, The Hacker News, CyberSecurity News, Infosecurity Magazine, Dark Reading, and Bleeping Computer.