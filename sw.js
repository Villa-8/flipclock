const CACHE_NAME = 'villa8-clock-v2';

// List of files to store offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './icon-512.png',
  // External CSS & JS (Required for the clock to appear offline)
  'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.7/flipclock.css',
  'https://code.jquery.com/jquery-3.4.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.7/flipclock.min.js',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Syncopate:wght@700&family=Cinzel:wght@600&display=swap'
];

// 1. Install Phase: Create the cache and save the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('VILLA 8: Caching system files');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 2. Activate Phase: Clean up old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('VILLA 8: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch Phase: The magic that makes it work without Wi-Fi
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the file from cache if we have it, otherwise use the network
      return response || fetch(event.request);
    })
  );
});
