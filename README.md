# Jainam H. Maru — Portfolio

Cybersecurity portfolio with a live now-playing card (vinyl player on the dashboard), a contact form with message storage, and a Node backend.

## Run locally

```bash
node server.mjs
```

Serves on `http://localhost:8000`.

## Backend API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Contact form — body `{"name","email","message"}`. Validates and appends to `messages.json` |
| `/api/contact?key=YOUR_KEY` | GET | Read received messages (JSON array) |
| `/now-playing` | GET | Current/last played song from Last.fm (cached 30s) |
| `/login`, `/callback` | GET | Spotify OAuth flow (optional, see below) |

Set the admin key with the `ADMIN_KEY` env var (default `change-me`).

## Now-playing (Last.fm)

The card reads your live song from Last.fm — no Spotify Premium needed.

1. Create a free account at https://www.last.fm and connect your Spotify account (last.fm → Settings → Applications → Connect Spotify)
2. Get a free API key at https://www.last.fm/api/account/create
3. Put it in `spotify.json`:

```json
{ "lastfm_key": "...", "lastfm_user": "your-username" }
```

Or set `LASTFM_API_KEY` / `LASTFM_USER` env vars. The card page (`now-playing.html`) also falls back to calling Last.fm directly from the browser, so it works even on static hosting.

## Optional: Spotify (Premium required)

If you have Spotify Premium, the card can read the player API directly:

1. Create an app at https://developer.spotify.com/dashboard
2. Add `http://localhost:8000/callback` (locally) or `https://<your-domain>/callback` (hosted) as a redirect URI
3. Set `client_id` / `client_secret` in `spotify.json` or env vars
4. Visit `/login` once, click Agree

### Environment variables

| Var | Purpose |
|-----|---------|
| `PORT` | Server port (default 8000) |
| `BASE_URL` | Public URL, e.g. `https://mysite.onrender.com` — used for the Spotify redirect URI |
| `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` | Spotify app credentials |
| `LASTFM_API_KEY` / `LASTFM_USER` | Last.fm API key + username |
| `ADMIN_KEY` | Key to read contact messages via `/api/contact?key=` |

`spotify.json` and `messages.json` are gitignored — never commit credentials.

## Deploy (Render, free)

1. Create a free account at https://render.com → **New → Web Service**
2. Connect the `Dev9269/portfolio` GitHub repo
3. Build command: `npm install` — Start command: `node server.mjs`
4. Add env vars (`LASTFM_API_KEY`, `LASTFM_USER`, `ADMIN_KEY`, optionally `SPOTIFY_CLIENT_ID`/`SPOTIFY_CLIENT_SECRET`)
5. Deploy — then set `BASE_URL` to your Render URL and re-deploy

The static site is also deployed on GitHub Pages at https://dev9269.github.io/portfolio/ (the card falls back to direct Last.fm there; the contact form needs the hosted backend).