/*
 * Retired service worker. The old version cached "/" and "/index.html", which would keep showing
 * the previous site to returning visitors. This version deletes every cache, unregisters itself
 * and reloads open tabs once, so everyone gets the current pages from the server.
 */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((c) => c.navigate(c.url));
    })(),
  );
});
