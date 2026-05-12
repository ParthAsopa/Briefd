# briefd

> Your personal audio cybersecurity news briefing.

**briefd** is a PWA that pulls the latest cybersecurity news from 6 major sources, rewrites every story in plain English using AI, and reads them out to you — so you stay on top of the threat landscape without reading a single article.

🔗 **Live:** [briefdbyparth.vercel.app](https://briefdbyparth.vercel.app)

---

## The Origin

A peer shared a list of cybersecurity news sites to follow as part of a career discussion. The list was solid — but the problem was having to actually sit and read through all of them. Briefd was built to solve exactly that: consume the same sources, passively, just by listening.

---

## The Problem

Staying current in cybersecurity means consuming a lot of news. Most people in the field either spend too much time reading, or fall behind entirely. Briefd is built for people who learn better by listening — it turns your daily security news into a generated audio briefing, updated automatically every 2 hours.

---

## Features

- 🎧 **Audio briefing** — hit play and listen to today's top stories read aloud, hands-free
- 🃏 **Masonry card grid** — Pinterest-style layout with cards that highlight as each story plays
- 🏷️ **Auto-tagging** — every story tagged as Breach, Exploit, CVE, Ransomware, Tool, Malware, Phishing, Privacy, Patch, or Other
- 🤖 **AI summarization** — Groq (Llama 3.3 70B) rewrites headlines and summaries in casual plain English, no jargon
- 📡 **6 news sources** — auto-refreshed from the feeds below
- ⚡ **Background refresh** — fetches and summarizes new stories every 2 hours automatically
- 📦 **Offline support** — cached stories load instantly even without internet
- 📱 **Installable PWA** — add to home screen on Android or install as a desktop app, runs fullscreen
- 🔄 **Force refresh** — manually trigger a fresh fetch anytime from the header

---

## News Sources

| Source                | URL                                                                |
| --------------------- | ------------------------------------------------------------------ |
| SecurityWeek          | [securityweek.com](https://www.securityweek.com)                   |
| The Hacker News       | [thehackernews.com](https://thehackernews.com)                     |
| CyberSecurity News    | [cybersecuritynews.com](https://cybersecuritynews.com)             |
| Infosecurity Magazine | [infosecurity-magazine.com](https://www.infosecurity-magazine.com) |
| Dark Reading          | [darkreading.com](https://www.darkreading.com)                     |
| Bleeping Computer     | [bleepingcomputer.com](https://www.bleepingcomputer.com)           |

---

## Tech Stack

| Layer            | Technology                                 |
| ---------------- | ------------------------------------------ |
| Frontend         | React + Vite                               |
| PWA              | vite-plugin-pwa + Workbox                  |
| Backend          | Vercel Serverless Functions                |
| AI Summarization | Groq API (Llama 3.3 70B)                   |
| News Sources     | RSS feeds via rss-parser                   |
| Local Storage    | IndexedDB via idb                          |
| Audio            | Web Speech API (built-in, free, no limits) |
| Hosting          | Vercel (free tier)                         |

**Entirely free to run.** No paid APIs, no paid hosting, no subscriptions.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com)
- A [Vercel account](https://vercel.com) (free)

### Installation

```bash
# Clone the repo
git clone https://github.com/ParthAsopa/Briefd.git
cd Briefd

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

Local development requires `vercel dev` to proxy the serverless functions alongside the frontend. Due to a known Vite + Vercel Dev compatibility issue on some systems, the recommended approach is to deploy your own fork to Vercel and test there — it auto-deploys on every push in seconds.

If you need local function testing, you can hit the deployed API endpoints directly from your local frontend by updating the fetch URLs in `src/lib/newsService.js` to point to your Vercel deployment.

### Deploy

```bash
git push
```

Vercel auto-deploys on every push to main.

---

## Project Structure

```
Briefd/
├── api/
│   ├── fetch-news.js        # Serverless — fetches all 6 RSS feeds
│   └── summarize.js         # Serverless — Groq AI summarization + tagging
├── public/
│   ├── favicon.ico
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx  # Bottom audio player with progress bar
│   │   ├── FilterBar.jsx    # Tag filter pills
│   │   ├── Header.jsx       # Sticky header with refresh button
│   │   ├── NewsCard.jsx     # Individual story card with hover effects
│   │   ├── SkeletonCard.jsx # Shimmer loading state
│   │   └── TagBadge.jsx     # Color-coded category badge
│   ├── lib/
│   │   ├── audioService.js  # Web Speech API wrapper (play/pause/skip)
│   │   ├── db.js            # IndexedDB read/write operations
│   │   └── newsService.js   # Fetch + cache orchestration logic
│   ├── App.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── vercel.json
```

---

## Installing on Android

1. Open [briefdbyparth.vercel.app](https://briefdbyparth.vercel.app) in Chrome
2. Tap the three-dot menu → **Add to Home screen**
3. Launch from your home screen — runs fullscreen, works offline

---

## How It Works

```
Browser / PWA
     ↓ on load or manual refresh
Check IndexedDB cache
     ↓ if stale (>2 hours)
GET /api/fetch-news  →  Parses all 6 RSS feeds
     ↓
POST /api/summarize  →  Groq Llama 3.3 rewrites + tags each article
     ↓
Save to IndexedDB   →  Serve to UI instantly on next load
     ↓
Web Speech API reads summaries aloud on Play
```

---

## Roadmap

- [ ] Interest selection — pick topics beyond cybersecurity
- [ ] More configurable news sources
- [ ] Playback speed control
- [ ] Voice selection
- [ ] Push notifications when new stories are available
- [ ] Light theme

---

## License

GNU Affero General Public License v3.0 — see [LICENSE](LICENSE) for details.

---

## Acknowledgements

Built with [Groq](https://groq.com), [Vercel](https://vercel.com), and the Web Speech API.

Developed with the help of [Claude](https://claude.ai) (Anthropic) for architecture, backend, and development guidance, and [v0](https://v0.dev) (Vercel) for UI design.
