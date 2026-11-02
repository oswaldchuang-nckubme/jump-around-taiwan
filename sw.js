// 更新遊戲內容後，把版本號加一，已安裝的手機才會換掉舊檔案。
const VERSION = 'v1';
const CACHE = 'jump-taiwan-' + VERSION;
const FONT_CACHE = 'jump-taiwan-fonts';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(k => k !== CACHE && k !== FONT_CACHE)
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 頁面：先連網拿最新版，連不上或超過 3 秒就用快取。
async function pageRequest(request) {
  const cache = await caches.open(CACHE);
  const network = fetch(request).then(res => {
    if (res.ok) cache.put('./index.html', res.clone());
    return res;
  });
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000));
  try {
    return await Promise.race([network, timeout]);
  } catch (e) {
    return (await cache.match('./index.html')) || network;
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res.ok || res.type === 'opaque') cache.put(request, res.clone());
    return res;
  } catch (e) {
    return Response.error();
  }
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (request.mode === 'navigate') {
    event.respondWith(pageRequest(request));
  } else if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request, CACHE));
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
  }
});
