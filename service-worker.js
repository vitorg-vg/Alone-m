const CACHE = "mapa-acaso-v5";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE));
});

self.addEventListener("fetch", e => {
  if (e.request.url.includes("deckofcardsapi")) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        try {
          const res = await fetch(e.request);
          cache.put(e.request, res.clone());
          return res;
        } catch {
          return caches.match(e.request);
        }
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
