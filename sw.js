const CACHE_NAME = 'flipclock-v1';
const ASSETS = [
  '/flipclock/',
  '/flipclock/index.html',
  '/flipclock/manifest.json',
  '/flipclock/icon-192.png',
  '/flipclock/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
