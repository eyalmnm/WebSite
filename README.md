# EM Projects website

Public corporate and product website for **EM Projects**. It is a marketing site only.

This site is **not** a product application, **not** a backend, and **not** an authentication portal.

**GitHub:** [github.com/eyalmnm/WebSite](https://github.com/eyalmnm/WebSite)

## Architecture

```
EM Projects Website     →  public marketing site (this repo)
DiveIQ                  →  separate product / application
DiveCenterIQ            →  separate B2B product / application
DivePassport            →  future product
SeaIQ                   →  future product
```

The website must remain separate from all product applications. It does **not**:

- access DiveIQ or DiveCenterIQ databases
- share customer data or `/data` volumes
- implement product authentication
- serve as a backend for DiveCenterIQ or any other product

See [docs/WEBSITE_ARCHITECTURE.md](docs/WEBSITE_ARCHITECTURE.md).

## Product structure

| Product | Role | Status on this site |
|---------|------|---------------------|
| DiveIQ | Personal diving | Coming soon on Google Play |
| DiveCenterIQ | Dive center management | Coming soon |
| DivePassport | Portable identity + trusted experience | Future |
| SeaIQ | Maritime / sailing | Planned (coming later) |

Do not present DiveCenterIQ, DivePassport, or SeaIQ as live production services.

## Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` | Company hub, product family, contact |
| `diveiq.html` | `/diveiq.html` | DiveIQ product page |
| `divecenteriq.html` | `/divecenteriq.html` | DiveCenterIQ (coming soon) |
| `privacy.html` | `/privacy.html` | Privacy policy for **DiveIQ** |
| `robots.txt` | `/robots.txt` | Crawler rules |
| `sitemap.xml` | `/sitemap.xml` | Public page list |
| `server.js` | `GET /health` | Railway health check (`{"status":"ok"}`) |

## Local development

```bash
npm install
npm start
```

Open http://localhost:3000

Requires Node.js 18 or newer. There is no test suite and no bundler.

## Railway deployment

1. [railway.com](https://railway.com) → **New Project** → **Deploy from GitHub** → select **eyalmnm/WebSite**.
2. Leave **Root Directory** empty (repo root is the site).
3. Railway runs `npm install` and `node server.js` (see `railway.toml`).
4. Health check: `GET /health` (`healthcheckPath = "/health"`). The site root `/` remains the public homepage.

Do not point the health check at a product application or database.

### Custom domain

Add a custom domain (for example `em-projects.com`) under **Settings → Networking**.

Canonical URLs, Open Graph tags, `robots.txt`, and `sitemap.xml` currently use `https://em-projects.com`. If the public domain changes, update those files together.

### Play Console (after live URL)

| Field | Example |
|-------|---------|
| Website | `https://your-domain/` |
| Privacy policy | `https://your-domain/privacy.html` |
| Contact | `info@em-projects.com` |

## Privacy

`privacy.html` is the **DiveIQ** privacy policy (Google Play). It does not describe DiveCenterIQ data processing.

**TODO:** Write a DiveCenterIQ-specific privacy policy before that product is offered to customers. Do not reuse the DiveIQ policy as if it covered DiveCenterIQ.

## Assets

| File | Use |
|------|-----|
| `assets/em-projects-logo.svg` | Header (EM Projects) |
| `assets/favicon.svg` | Browser tab |
| `assets/app_logo-card.png` | DiveIQ card + product page |
| `assets/app_logo.png` | Full-resolution DiveIQ logo (source) |
| `assets/divecenteriq-logo.svg` | DiveCenterIQ card + product page |

To replace the DiveIQ logo, update `assets/app_logo.png` and regenerate smaller sizes:

```bash
cd assets
sips -Z 192 app_logo.png --out app_logo-card.png
```

## Contact

`info@em-projects.com`
