const CACHE_NAME = 'ShiroKuro-tile-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',       // あればCSSファイル
  './app.js',         // メインJSファイル
  './manifest.json',
  './tileicon.svg',
  './tileicon.svg'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// フェッチ時にキャッシュから取得
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
