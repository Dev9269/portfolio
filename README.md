# Jainam H. Maru — Portfolio

Cybersecurity portfolio with a live Spotify now-playing card (vinyl player on the dashboard).

## Run locally

```bash
node server.mjs
```

Serves on `http://localhost:8000`.

## Spotify now-playing

The dashboard card shows your currently playing song (or last played). Requires a Spotify Developer App:

1. Create an app at https://developer.spotify.com/dashboard
2. Set credentials via environment variables, or put them in `spotify.json`:

```json
{ "client_id": "...", "client_secret": "..." }
```

3. Add the redirect URI to the Spotify app settings: `http://localhost:8000/callback` (locally) or `https://<your-domain>/callback` (hosted)
4. Visit `/login` once, click Agree

### Environment variables

| Var | Purpose |
|-----|---------|
| `PORT` | Server port (default 8000) |
| `BASE_URL` | Public URL, e.g. `https://mysite.onrender.com` — used for the Spotify redirect URI |
| `SPOTIFY_CLIENT_ID` | Spotify app client ID |
| `SPOTIFY_CLIENT_SECRET` | Spotify app client secret |

`spotify.json` is gitignored — never commit credentials.