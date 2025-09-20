const CACHE_NAME = 'silent-gamers-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-20_09-43-31-711.png?updatedAt=1758341648411',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-16_07-10-33-449.png?updatedAt=1758209952116',
  'https://ik.imagekit.io/silentgamers/Copy%20of%20silent_20250919_184429_0002.gif?updatedAt=1758287748025',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-19_15-35-12-168.png?updatedAt=1758287986286',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-19_15-37-07-261.png?updatedAt=1758287984360',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-19_15-29-08-757.png?updatedAt=1758287986342',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-19_15-31-17-146.png?updatedAt=1758287986435',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-19_15-42-42-048.png?updatedAt=1758287984590',
  'https://ik.imagekit.io/silentgamers/Picsart_25-09-18_02-49-16-996.jpg?updatedAt=1758210646096'
]; 

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
}); 

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
}); 

// Fetch event
self.addEventListener('fetch', event => {
  if (!(event.request.url.indexOf('http') === 0)) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        } 

        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          } 

          // Clone the response
          const responseToCache = response.clone(); 

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            }); 

          return response;
        });
      }).catch(() => {
        // For images, return a placeholder if fetch fails
        if (event.request.destination === 'image') {
          return caches.match('https://ik.imagekit.io/silentgamers/Picsart_25-09-16_07-10-33-449.png?updatedAt=1758209952116');
        }
        // For HTML pages, return the offline page
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
}); 

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
  }
}); 

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: 'https://ik.imagekit.io/silentgamers/Picsart_25-09-20_09-43-31-711.png?updatedAt=1758341648411',
    badge: 'https://ik.imagekit.io/silentgamers/Picsart_25-09-20_09-43-31-711.png?updatedAt=1758341648411',
    vibrate: [200, 100, 200],
    tag: 'silent-gamers-notification'
  }; 

  event.waitUntil(
    self.registration.showNotification('Silent Gamers', options)
  );
}); 

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});
