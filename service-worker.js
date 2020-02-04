const CACHE_MAIN = 'main1580778984047';
const precacheList = [
  
  '/',
  '/2020/load-jquery-in-developer-console.html',
  '/2019/book-the-4th-revolution.html',
  '/2019/generate-anki-cards-tool.html',
  '/2018/merge-sort-in-javascript.html',
  '/2018/selection-sort-in-javascript.html',
  '/2018/insertion-sort-in-javascript.html',
  '/2018/create-a-new-icon.html',
  '/2018/add-json-ld-structured-data.html',
  '/2018/bubble-sort-in-javascript.html',
  '/2018/a11y-fixes-for-prism-default-theme.html',
  '/assets/images/harsh-jain-xoMeq3-GwTY-unsplash/harsh-jain-xoMeq3-GwTY-unsplash.svg',
  '/assets/images/sorry-imkirk-215248-unsplash/sorry-imkirk-215248-unsplash.svg',
  '/assets/images/kate-krivanec-212730-unsplash/kate-krivanec-212730-unsplash.svg',
  '/assets/images/tj-holowaychuk-62184-unsplash/tj-holowaychuk-62184-unsplash.svg',
  '/assets/images/pietro-mattia-764559-unsplash/pietro-mattia-764559-unsplash.svg',
  '/assets/images/mingwei-dong-651103-unsplash/mingwei-dong-651103-unsplash.svg',
  '/assets/images/new-icon/new-icon.svg',
  '/assets/images/thomas-kelley-75110-unsplash/thomas-kelley-75110-unsplash.svg',
  '/assets/images/jong-marshes-458354-unsplash/jong-marshes-458354-unsplash.svg',
  '/assets/images/stas-ovsky-781959-unsplash/stas-ovsky-781959-unsplash.svg',
  '/css/prism.css',
  '/css/global_async.css',
  '/js/lazysizes/lazysizes.min.js',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_MAIN).then(cache => cache.addAll(precacheList))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_MAIN)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (precacheList.includes(url.pathname)) {
    return event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response
        }
        return fetch(request.clone());
      })
    );
  }

  if (request.method === 'GET' && url.origin === location.origin) {
    return event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }

        return fetch(request.clone()).then(response => {
          caches.open(CACHE_MAIN).then(cache => {
            cache.put(request, response);
          });
          return response.clone();
        });
      })
    );
  }
});
