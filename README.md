# EM Projects website

Static site for **EM Projects** and **DiveIQ**, served as a minimal **Node.js** app on [Railway](https://railway.com) (or any static host).

**GitHub:** [github.com/eyalmnm/WebSite](https://github.com/eyalmnm/WebSite)

## Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` | Company hub, apps, contact |
| `diveiq.html` | `/diveiq.html` | DiveIQ product page |
| `privacy.html` | `/privacy.html` | Privacy policy (Google Play) |

## Local preview

```bash
npm install
npm start
```

Open http://localhost:3000

## Push to GitHub

First time (from this folder):

```bash
cd /Users/test/Projects/DiveIQ/WebSite
git init
git add .
git commit -m "Initial EM Projects website"
git branch -M main
git remote add origin https://github.com/eyalmnm/WebSite.git
git push -u origin main
```

Updates:

```bash
git add .
git commit -m "Describe your change"
git push
```

Use **GitHub CLI** (`gh auth login`) or **SSH** if you prefer not to type a password. Do not commit personal access tokens.

## Deploy on Railway

1. [railway.com](https://railway.com) → **New Project** → **Deploy from GitHub** → select **eyalmnm/WebSite**.
2. Leave **Root Directory** empty (repo root is the site).
3. Railway runs `npm install` and `npm start` (`serve` static files).
4. Add a custom domain (e.g. `em-projects.com`) under **Settings → Networking**.

### Play Console (after live URL)

| Field | Example |
|-------|---------|
| Website | `https://your-domain/` |
| Privacy policy | `https://your-domain/privacy.html` |
| Contact | `info@em-projects.com` |

## Assets

| File | Use |
|------|-----|
| `assets/em-projects-logo.svg` | Header (EM Projects) |
| `assets/favicon.svg` | Browser tab |
| `assets/app_logo-card.png` | DiveIQ card + product page |
| `assets/app_logo.png` | Full-resolution DiveIQ logo (source) |

To replace the DiveIQ logo, update `assets/app_logo.png` and regenerate smaller sizes:

```bash
cd assets
sips -Z 192 app_logo.png --out app_logo-card.png
```

## Contact

`info@em-projects.com`
