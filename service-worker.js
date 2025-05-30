const CACHE_NAME = 'galeria-v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'firebase-init.js',
  'registro.js',
  'icons/icon-192.png',
  'manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Archivos cacheados');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activado');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Borrando caché antigua', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepción de solicitudes (fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve lo del caché si existe, si no, va a la red
        return response || fetch(event.request);
      })
  );
});
