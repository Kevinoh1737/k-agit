var CACHE_NAME = 'kagit-v2';
var SHELL_ASSETS = [
  '/static/apple-touch-icon.png',
  '/static/favicon-32.png',
  '/static/images/logo_md.png',
  '/static/images/logo_sm.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(SHELL_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  if (url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(e.request).catch(function() {
        return new Response(JSON.stringify({error: 'offline'}), {
          status: 503,
          headers: {'Content-Type': 'application/json'}
        });
      })
    );
    return;
  }

  if (url.pathname.startsWith('/static/')) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(resp) {
          var clone = resp.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
          return resp;
        });
      })
    );
    return;
  }

  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
