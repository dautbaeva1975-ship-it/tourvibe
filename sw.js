const CACHE = 'tourvibe-v1';
const ASSETS = ['./', './index.html', './styles.css', './app.js', './hotels_data.json', './manifest.json'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
  if (event.request.method === 'GET' && new URL(event.request.url).origin === location.origin) {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy));
  }
  return response;
}).catch(() => caches.match('./index.html')))));
