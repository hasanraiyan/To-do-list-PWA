const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/images/boy.png",
  "/images/briefcase.png",
  "/images/calendar.png",
  "/images/dumbbell.png",
  "/images/education.png",
  "/images/healthcare.png",
  "/images/logo.png",
  "/images/saving.png",
  "/images/shopping.png",
  "/images/sun.png",
  "/images/web-design.png",
  'https://via.placeholder.com/192',
  'https://via.placeholder.com/512',
  'https://via.placeholder.com/800x600',
  'https://via.placeholder.com/400x600'
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
