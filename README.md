<div align="center">

# Portfolio

[![Stars](https://img.shields.io/github/stars/Dev9269/portfolio?style=flat-square&logo=github&color=gold)](https://github.com/Dev9269/portfolio)
[![License](https://img.shields.io/github/license/Dev9269/portfolio?style=flat-square&color=brightgreen)](LICENSE)
[![CI](https://github.com/Dev9269/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Dev9269/portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/Dev9269/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Dev9269/portfolio/actions/workflows/deploy.yml)

A professional developer portfolio built with React, Tailwind CSS, and Framer Motion.

**Created by** [Jainam Maru](https://github.com/Dev9269)

**Live:** [dev9269.github.io/portfolio](https://dev9269.github.io/portfolio/)

</div>

## Tech Stack

- **React 19** — UI framework
- **Tailwind CSS 3.4** — Styling
- **Framer Motion** — Animations
- **Vite** — Build tool
- **React Router** — Client-side routing
- **Three.js** — 3D canvas globe
- **Lucide React** — Icons
- **Lenis** — Smooth scrolling

## Quick Start

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── profile.png
│   ├── resume.html
│   ├── robots.txt
│   └── 404.html
├── src/
│   ├── admin/
│   │   └── AdminPage.jsx      — Admin dashboard with auth
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── About.jsx          — About section with animated counters
│   │   ├── Certifications.jsx — Certifications grid
│   │   ├── Contact.jsx        — Contact form with social links
│   │   ├── Footer.jsx         — Footer with links
│   │   ├── Goals.jsx          — Goals & interests sections
│   │   ├── Hero.jsx           — Hero with Three.js globe
│   │   ├── Journey.jsx        — Timeline + hackathons
│   │   ├── Navbar.jsx         — Responsive navigation
│   │   ├── Projects.jsx       — Project showcase
│   │   └── Skills.jsx         — Skills with animated bars
│   ├── data/
│   │   ├── liveData.js        — localStorage-backed data layer
│   │   └── portfolio.js       — All portfolio content
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── CertificationsPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── InterestsPage.jsx
│   │   ├── JourneyPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   └── SkillsPage.jsx
│   ├── App.jsx                — Root with routing + DevTools blocker
│   ├── index.css              — Tailwind + global styles
│   └── main.jsx               — Entry point
├── index.html
├── tailwind.config.js
├── eslint.config.js
└── package.json
```

## Features

- **9 pages** with HashRouter (SPA)
- **3D globe** in hero section (Three.js)
- **Responsive** — mobile-first, all breakpoints
- **Dark theme** — consistent dark color scheme
- **Animations** — scroll reveals, hover effects, page transitions
- **Admin panel** — password-protected content editor at `/superadminxyz`
- **DevTools protection** — F12/right-click blocked on production
- **Rate-limited admin login** — lockout after 5 failed attempts
- **localStorage persistence** — admin changes survive page reload
- **SEO meta tags** — Open Graph, Twitter Card, description

## Admin Panel

Access the admin panel at `/superadminxyz` to edit portfolio content directly in the browser. Changes are persisted to localStorage.

Security features:
- SHA-256 password hashing
- Rate limiting (5 attempts, 15 min lockout)
- Hidden route (obfuscated path, not in sitemap)
- Blocked from search engine indexing via `robots.txt`

## Deployment

The project includes GitHub Actions CI/CD:

- **CI** — Runs on every push/PR: installs dependencies, lints, builds
- **Deploy** — Automatically deploys to GitHub Pages on push to `master`

### Manual Deploy

```bash
npm run build
```

Upload the `dist/` folder to any static host (Vercel, Netlify, etc.).
