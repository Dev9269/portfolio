# Jainam H. Maru — Portfolio

[![Live Site](https://img.shields.io/badge/LIVE-dev9269.github.io%2Fportfolio-red)](https://dev9269.github.io/portfolio/)

Personal cybersecurity portfolio of **Jainam H. Maru (Dev9269)** — security researcher, OS dev & full-stack engineer. © 2026.

The site features a live **"now playing" vinyl card** (powered by Last.fm), a **contact form with a real backend**, and a custom avatar photo — all on a dashboard-style single page.

---

## Live Site

🔗 **https://dev9269.github.io/portfolio/**

---

## Features

- 🎙️ **Now-playing card** — shows the song currently scrobbling on the owner's Last.fm account:
  - Backend-first: reads `/now-playing` from the Node server (cached 30s)
  - Direct browser fallback to the Last.fm API (works even on static GitHub Pages, because Last.fm sends CORS `*`)
  - Click the card → opens the song on YouTube
  - Spinning vinyl animation, explicit error messages (expired / no token / rate-limited)
- 📬 **Contact form backend** — "Send me a message" form:
  - `POST /api/contact` validates and stores messages (id, timestamp, IP) in `messages.json`
  - `GET /api/contact?key=ADMIN_KEY` lets the owner read messages
  - Inline success / error feedback on the card
- 📊 **Design Time Spent gauge** — animated dashboard gauge (2020–2026)
- 🧑‍💻 **Personal branding** — name "Jainam H. Maru" in hero, bio and alt texts; custom avatar photo (cache-busted `?v=2`)
- 🎨 Dashboard-style design with skill chips, socials (mailto, LinkedIn, GitHub, Instagram), resume link

---

## Tech Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Frontend   | Compiled React bundle (Vite build) + custom CSS   |
| Backend    | Node.js (built-in `http` module — no frameworks)  |
| Music data | Last.fm API (free, no Premium) · Spotify OAuth (optional fallback) |
| Storage    | `messages.json` (file-based JSON)                 |
| Hosting    | GitHub Pages (static) + optional Render (full backend) |

---

## Project Structure

```
Jainam-portfolio/
├── index.html          # Entry point
├── assets/             # Compiled React bundle (index-vCZ8uuPF.js), CSS, images
├── img/                # avatar.png (personal photo) + other images
├── server.mjs          # Node backend: static + /api/contact + /now-playing
├── now-playing.html    # Standalone now-playing card page (backup UI)
├── spotify.json        # API keys (Last.fm + Spotify) — gitignored
├── messages.json       # Contact form messages (gitignored)
├── swap.js + pairs*.js # Content-swap scripts (pairs1–13)
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+

### Install & run

```bash
node server.mjs
```

Serves on **http://localhost:8000**.

---

## Backend API

| Method | Route                  | Description                                                       |
| ------ | ---------------------- | ----------------------------------------------------------------- |
| GET    | `/now-playing`         | Current/last played song from Last.fm (30s cache). Fallback to Spotify if Last.fm key missing |
| POST   | `/api/contact`         | Save a message. Body: `{name, email, message}` → appends to `messages.json` with id, timestamp, IP |
| GET    | `/api/contact?key=KEY` | Read all received messages (requires admin key)                   |
| GET    | `/login`, `/callback`  | Spotify OAuth flow (optional, only if you have Spotify Premium)   |

### Environment variables

| Variable            | Default     | Purpose                                        |
| ------------------- | ----------- | ---------------------------------------------- |
| `PORT`              | `8000`      | Server port                                    |
| `BASE_URL`          | —           | Public URL for Spotify OAuth redirect          |
| `ADMIN_KEY`         | `change-me` | Key required to read contact messages          |
| `LASTFM_API_KEY` / `LASTFM_USER` | —  | Last.fm credentials (see below)          |
| `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` | — | Spotify credentials (optional)   |

---

## Now-Playing Setup (Last.fm — free, no Premium)

The vinyl card shows your live song from Last.fm. No Spotify Premium needed.

1. Create a free account at https://www.last.fm and **connect your Spotify account** (Last.fm → Settings → Applications → Connect Spotify) so your plays scrobble automatically
2. Get a free API key at https://www.last.fm/api/account/create
3. Put the key + your username in `spotify.json`:

```json
{
  "lastfm_key": "YOUR_LASTFM_API_KEY",
  "lastfm_user": "Dev9269"
}
```

4. Restart the server — the card now shows your current song

### Why Last.fm and not Spotify directly?

Spotify's Web API & Web Playback SDK now require **Spotify Premium** (Development Mode policy change, Feb 2026). Last.fm is free and its public API sends `Access-Control-Allow-Origin: *`, so the card can even call it directly from a static GitHub Pages site.

---

## Contact Form Flow

```
Visitor submits (name, email, message)
        │
        ▼
fetch POST /api/contact        ← dashboard card
        │
        ▼
Server validates (name/email/message required → 400 if missing)
        │
        ▼
Appends to messages.json (id, at, ip) → 200 {"ok": true}
        │
        ▼
Card shows "Message sent — thanks!"
```

Owner reads messages:

```bash
curl "http://localhost:8000/api/contact?key=change-me"
```

---

## Deployment

### GitHub Pages (static)

The site is deployed at **https://dev9269.github.io/portfolio/**. On Pages:

- The now-playing card works via the **direct Last.fm fallback** (no server needed)
- The contact form shows "could not send — please email me instead" (no server)

### Full stack (Render)

1. Create a free account at https://render.com
2. **New → Web Service → Connect** the `Dev9269/portfolio` repo
3. Start command: `node server.mjs`
4. Env vars: `ADMIN_KEY`, `LASTFM_API_KEY`, `LASTFM_USER`
5. Deploy — now-playing + contact form both work fully online

---

## Content Swap System

All site content (name, texts, images, gauge, form) was edited through `swap.js` + `pairsN.js`:

```bash
node swap.js assets/index-vCZ8uuPF.js pairs1.js   # ... etc (pairs1–13)
```

`swap.js` does exact string replacement in the compiled bundle, reports `OK n×` or `MISS` per pair, and the result is verified with `node --check`.

> ⚠️ `swap.js` is **not idempotent** — never re-run an already-applied pairs file.

---

## Author

**Jainam H. Maru (Dev9269)** — Security researcher, OS dev & full-stack engineer.

- Email: Jainammaru567000@gmail.com
- GitHub: [@Dev9269](https://github.com/Dev9269)
- LinkedIn: [jainam-h-maru](https://www.linkedin.com/in/jainam-h-maru)
- Instagram: [@jainammaru_](https://www.instagram.com/jainammaru_)
- Resume: https://jainamhmaru.vercel.app/resume.html
- Gym project: https://dev9269.github.io/

---

## License

© 2026 Jainam H. Maru. All rights reserved.