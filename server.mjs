import http from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT) || 8000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const redirectUri = `${baseUrl}/callback`;
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".mp3": "audio/mpeg", ".json": "application/json" };
const imgExt = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
const spotifyFile = join(process.cwd(), "spotify.json");
const messagesFile = join(process.cwd(), "messages.json");
const adminKey = process.env.ADMIN_KEY || "change-me";
const scopes = "user-read-currently-playing user-read-recently-played user-read-playback-state";
let spotifyCache = null, spotifyCachedAt = 0;

async function readBody(req) {
  let data = "";
  for await (const chunk of req) data += chunk;
  return data;
}

async function spotifyToken() {
  const file = { client_id: process.env.SPOTIFY_CLIENT_ID, client_secret: process.env.SPOTIFY_CLIENT_SECRET };
  try { Object.assign(file, JSON.parse(await readFile(spotifyFile, "utf8"))); } catch { }
  return file;
}

async function refreshAccessToken(cfg) {
  if (!cfg.refresh_token || !cfg.client_id || !cfg.client_secret) return false;
  const f = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=refresh_token&refresh_token=${cfg.refresh_token}&client_id=${cfg.client_id}&client_secret=${cfg.client_secret}`,
  });
  const t = await f.json();
  if (!t.access_token) return false;
  cfg.access_token = t.access_token;
  await writeFile(spotifyFile, JSON.stringify(cfg));
  return true;
}

async function lastfmNowPlaying() {
  const cfg = await spotifyToken();
  if (!cfg?.lastfm_key || !cfg?.lastfm_user) return null;
  const r = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(cfg.lastfm_user)}&api_key=${cfg.lastfm_key}&format=json&limit=1`);
  const t = (await r.json())?.recenttracks?.track?.[0];
  if (!t?.name) return { source: "lastfm", error: "nothing", message: "No scrobbles yet — play a song on Spotify" };
  return {
    source: "lastfm",
    is_playing: t["@attr"]?.nowplaying === "true",
    name: t.name,
    artists: [t.artist?.["#text"] || ""],
    image: t.image?.filter(i => i["#text"]).slice(-1)[0]?.["#text"] || "",
    url: t.url || "",
  };
}

async function spotifyNowPlaying() {
  const cfg = await spotifyToken();
  if (!cfg?.access_token) return { error: "no_token", message: "No Spotify token — visit /login to connect" };
  const call = async (url) => {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${cfg.access_token}` } });
    return { status: r.status, body: await r.json().catch(() => null) };
  };
  let { status, body } = await call("https://api.spotify.com/v1/me/player/currently-playing");
  if (status === 401 && await refreshAccessToken(cfg)) {
    ({ status, body } = await call("https://api.spotify.com/v1/me/player/currently-playing"));
  }
  if (status === 401) return { error: "expired", message: "Spotify token expired — visit /login to reconnect" };
  if (status === 429) return { error: "rate_limited", message: "Spotify rate limited — retrying shortly" };
  if (status === 204 || !body?.item) {
    const r = await call("https://api.spotify.com/v1/me/player/recently-played?limit=1");
    const item = r.body?.items?.[0]?.track;
    if (item) return { is_playing: false, source: "last", name: item.name, artists: item.artists.map(a => a.name), image: item.album?.images?.[0]?.url || "", url: item.external_urls?.spotify || "", duration_ms: item.duration_ms };
    if (r.status === 403) {
      const t = await call("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1");
      const top = t.body?.items?.[0];
      if (top) return { is_playing: false, source: "top", name: top.name, artists: top.artists.map(a => a.name), image: top.album?.images?.[0]?.url || "", url: top.external_urls?.spotify || "", duration_ms: top.duration_ms };
    }
    return { error: "nothing" };
  }
  const item = body.item;
  return {
    is_playing: body.is_playing,
    name: item.name,
    artists: item.artists.map(a => a.name),
    image: item.album?.images?.[0]?.url || "",
    url: item.external_urls?.spotify || "",
    duration_ms: item.duration_ms,
    progress_ms: body.progress_ms,
  };
}

http.createServer(async (req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/api/contact" && req.method === "POST") {
    try {
      const b = JSON.parse((await readBody(req)) || "{}");
      const name = String(b.name || "").trim().slice(0, 200);
      const email = String(b.email || "").trim().slice(0, 200);
      const message = String(b.message || "").trim().slice(0, 5000);
      if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Please fill name, a valid email and a message" }));
        return;
      }
      let list = [];
      try { list = JSON.parse(await readFile(messagesFile, "utf8")); } catch { }
      list.push({ id: Date.now(), at: new Date().toISOString(), ip: req.socket.remoteAddress, name, email, message });
      await writeFile(messagesFile, JSON.stringify(list, null, 2));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Bad request" }));
      return;
    }
  }
  if (url === "/api/contact" && req.method === "GET") {
    if (new URL(req.url, baseUrl).searchParams.get("key") !== adminKey) { res.writeHead(403); res.end("forbidden"); return; }
    try { res.writeHead(200, { "Content-Type": "application/json" }); res.end(await readFile(messagesFile, "utf8")); }
    catch { res.writeHead(200, { "Content-Type": "application/json" }); res.end("[]"); }
    return;
  }
  if (url === "/now-playing") {
    if (Date.now() - spotifyCachedAt > 30000) {
      spotifyCache = (await lastfmNowPlaying()) ?? await spotifyNowPlaying();
      spotifyCachedAt = Date.now();
    }
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify(spotifyCache));
    return;
  }
  if (url === "/login") {
    const cfg = await spotifyToken();
    if (!cfg?.client_id) { res.writeHead(400, { "Content-Type": "text/html" }); res.end("<h3>Missing client_id — set SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET env vars or put them in spotify.json, then restart</h3>"); return; }
    res.writeHead(302, { Location: `https://accounts.spotify.com/authorize?client_id=${cfg.client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}` });
    res.end();
    return;
  }
  if (url === "/callback") {
    const code = new URL(req.url, baseUrl).searchParams.get("code");
    if (!code) { res.writeHead(400); res.end("no code"); return; }
    const cfg = await spotifyToken();
    if (!cfg?.client_id || !cfg?.client_secret) { res.writeHead(400); res.end("missing client credentials"); return; }
    const f = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${cfg.client_id}&client_secret=${cfg.client_secret}`,
    });
    const t = await f.json();
    if (!t.access_token) { res.writeHead(400); res.end("token exchange failed: " + JSON.stringify(t)); return; }
    cfg.access_token = t.access_token;
    cfg.refresh_token = t.refresh_token;
    await writeFile(spotifyFile, JSON.stringify(cfg));
    spotifyCache = null;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>Spotify connected! Close this tab and refresh your portfolio.</h2>");
    return;
  }
  try {
    let p = decodeURIComponent(url).replaceAll("/", "\\");
    if (p === "\\") p = "\\index.html";
    p = normalize(p);
    const data = await readFile(join(process.cwd(), "." + p));
    res.writeHead(200, { "Content-Type": mime[extname(p)] || "application/octet-stream" });
    res.end(data);
  } catch {
    if (imgExt.includes(extname(url).toLowerCase())) {
      const data = await readFile(join(process.cwd(), "img\\placeholder.svg"));
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      res.end(data);
    } else {
      res.writeHead(404);
      res.end("not found");
    }
  }
}).listen(port, () => console.log("serving on http://localhost:" + port));