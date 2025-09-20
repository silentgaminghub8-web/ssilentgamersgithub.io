const CACHE_NAME = 'silent-gamers-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-20_09-43-31-711.png?updatedAt=1758341648411'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
