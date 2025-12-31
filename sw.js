const CACHE_NAME = 'villa8-v3';

// The specific scripts you mentioned MUST be in this list to work offline
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.7/flipclock.css',
  'https://code.jquery.com/jquery-3.4.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.7/flipclock.min.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Syncopate:wght@700&family=Cinzel:wght@600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached file OR fetch from internet if not in cache
      return response || fetch(event.request);
    })
  );
});
