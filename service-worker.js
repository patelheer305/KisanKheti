const CACHE_NAME = 'kisankheti-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        OFFLINE_URL,
        '/manifest.json'
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(r => r || caches.match(OFFLINE_URL)))
  );
});
