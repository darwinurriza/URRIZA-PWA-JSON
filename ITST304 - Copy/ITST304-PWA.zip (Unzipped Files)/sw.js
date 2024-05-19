self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open('pwa-cache').then(function(cache) {
          return cache.addAll([
              '/',
              '/index.html',
              '/manifest.json',
              '/css/styles.css',
              '/js/app.js',
              'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
              'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
              'https://code.jquery.com/jquery-3.6.0.min.js',
              'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
          ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
      })
  );
});
