const CACHE_NAME = 'v8-clock-v1';

// List of assets to cache (removed ./ prefix)
const assets = [
  'index.html',
  'manifest.json',
  'favicon.ico',
  'icon-192.png',
  'icon-512.png',
  'https://code.jquery.com/jquery-3.4.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.7/flipclock.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.7/flipclock.css',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Syncopate:wght@700&family=Cinzel:wght@600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return the cached version if it exists, otherwise fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
