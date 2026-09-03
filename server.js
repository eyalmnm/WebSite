const fs = require('fs');
const http = require('http');
const path = require('path');
const handler = require('serve-handler');

const port = Number(process.env.PORT) || 3000;
const SITE_ROOT = path.resolve(__dirname);

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
};

const BLOCKED_EXACT = new Set([
  '/server.js',
  '/package.json',
  '/package-lock.json',
  '/railway.toml',
  '/readme.md',
  '/.gitignore',
]);

const BLOCKED_PREFIXES = ['/node_modules', '/.git', '/docs'];

function pathnameOf(url) {
  try {
    const urlPath = new URL(url, 'http://127.0.0.1').pathname;
    if (urlPath.length > 1 && urlPath.endsWith('/')) {
      return urlPath.slice(0, -1);
    }
    return urlPath || '/';
  } catch {
    return url.split('?')[0] || '/';
  }
}

function isBlocked(pathname) {
  const lower = pathname.toLowerCase();
  if (BLOCKED_EXACT.has(lower) || lower.endsWith('.zip')) {
    return true;
  }
  return BLOCKED_PREFIXES.some((prefix) => lower === prefix || lower.startsWith(`${prefix}/`));
}

function applySecurityHeaders(response) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.setHeader(name, value);
  }
}

function isInsideSiteRoot(resolvedPath) {
  return resolvedPath === SITE_ROOT || resolvedPath.startsWith(SITE_ROOT + path.sep);
}

function withHtmlFileIfNeeded(requestUrl, pathname) {
  if (pathname === '/' || path.posix.extname(pathname)) {
    return requestUrl;
  }

  const htmlFile = path.resolve(SITE_ROOT, `.${pathname}.html`);
  if (!isInsideSiteRoot(htmlFile) || !fs.existsSync(htmlFile)) {
    return requestUrl;
  }

  const parsed = new URL(requestUrl, 'http://127.0.0.1');
  parsed.pathname = `${pathname}.html`;
  return parsed.pathname + parsed.search;
}

const server = http.createServer((request, response) => {
  const pathname = pathnameOf(request.url);

  applySecurityHeaders(response);

  if (pathname === '/health') {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET, HEAD' });
      response.end('Method Not Allowed');
      return;
    }
    const body = JSON.stringify({ status: 'ok' });
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
    return;
  }

  if (isBlocked(pathname)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  request.url = withHtmlFileIfNeeded(request.url, pathname);

  return handler(request, response, {
    public: __dirname,
    cleanUrls: false,
    directoryListing: false,
    rewrites: [{ source: '/', destination: '/index.html' }],
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
