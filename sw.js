// Service worker — app funciona 100% offline depois da primeira visita.
// Shell (HTML/fontes/ícones) pré-cacheado; fotos dos jogadores em cache-first.
var CACHE = 'copa26-v3';
var SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'players.json',
  'fonts/passion-one-700.woff2',
  'fonts/rubik-var.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // HTML e players.json: rede primeiro (pega atualização), cache se offline
  if (req.mode === 'navigate' || url.pathname.endsWith('players.json')) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) { return m || caches.match('./'); });
      })
    );
    return;
  }

  // Fotos, fontes, ícones: cache primeiro (imutáveis), busca e guarda se faltar
  e.respondWith(
    caches.match(req).then(function (m) {
      if (m) return m;
      return fetch(req).then(function (res) {
        if (res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
