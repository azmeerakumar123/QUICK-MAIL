const CACHE_NAME = 'quickmail-v1';
// This list is intentionally minimal. 
// In a real app with a build step, a manifest of assets would be injected here.
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  // Note: We don't cache the TSX/JS module files directly as they are loaded by the browser.
  // We also don't cache the external CDN scripts as that's complex and often not needed.
  // The browser's HTTP cache will handle those. The service worker is for the core app shell.
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});

// Optional: Clean up old caches upon activation of a new service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
