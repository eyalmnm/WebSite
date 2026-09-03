# Website architecture

This repository is the **EM Projects public corporate / product website**.

It is a static marketing site served by a small Node.js process. It is not a product backend.

## Product family (separate systems)

```
EM Projects Website
    ↓
public marketing site

DiveIQ
    ↓
separate application

DiveCenterIQ
    ↓
separate B2B application

SeaIQ
    ↓
future application
```

Each product is its own application. The website must stay independent of those applications.

## What this website is

- A public overview of EM Projects and its product family
- Static HTML, CSS, and JavaScript
- A Node server (`server.js`) that serves those files and a `/health` endpoint

## What this website is not

The website has **no access to product customer data**.

It must **not**:

- access DiveIQ databases
- access DiveCenterIQ databases
- share customer data with product applications
- share `/data` volumes with product applications
- implement authentication for DiveIQ, DiveCenterIQ, or SeaIQ
- become a backend for DiveCenterIQ (or any other product)
- run analytics or tracking on the marketing pages

## Runtime

```
Browser
  → Railway (or other host)
    → Node `server.js`
      → static files (HTML, CSS, JS, assets)
      → GET /health  (liveness only; no product data)
```

`GET /health` returns a simple JSON success body for Railway. It does not query product systems.

The Node server also sets baseline security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Content-Security-Policy`) and does not expose `server.js`, `package.json`, `node_modules`, or `docs/` to the public web.

## Pages

| Path | Role |
|------|------|
| `/` | Company hub and product family |
| `/diveiq.html` | DiveIQ product page (available) |
| `/divecenteriq.html` | DiveCenterIQ overview (coming soon; not a live service) |
| `/privacy.html` | DiveIQ privacy policy |
| `/robots.txt`, `/sitemap.xml` | Crawler hints |

SeaIQ is listed on the home page as planned. It has no product page yet.

## Privacy documentation

- `privacy.html` covers **DiveIQ** only.
- It does not describe DiveCenterIQ or SeaIQ data processing.

**TODO:** Add a DiveCenterIQ-specific privacy policy before DiveCenterIQ is offered to customers. Keep it in the DiveCenterIQ product (or a dedicated legal page), not as a claim that the current DiveIQ policy already covers that product.

## Domain

Production canonical URLs currently assume `https://em-projects.com`. Update HTML canonical/Open Graph tags, `robots.txt`, and `sitemap.xml` if the public hostname changes.
