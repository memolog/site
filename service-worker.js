const CACHE_MAIN = 'main1581975413603';
const precacheList = [
  
  '/',
  '/2020/inner-and-outer-display-type.html',
  '/2020/css-display-module-introduction.html',
  '/2020/about-position-sticky.html',
  '/2020/web-workers-lifetime.html',
  '/2020/convert-video-files-with-ffmpegjs-worker.html',
  '/2020/n2-sort-algorithms-again.html',
  '/2020/convert-screen-capture-with-ffmpeg.html',
  '/2020/optional-chaining-and-nullish-coalescing.html',
  '/2020/web-workers-work-on-ie10.html',
  '/2020/top-level-await-will-be-soon.html',
  '/assets/images/fotografierende-HMGNL811SQE-unsplash/fotografierende-HMGNL811SQE-unsplash.svg',
  '/assets/images/saad-chaudhry-pM2Hpsi-Hxs-unsplash/saad-chaudhry-pM2Hpsi-Hxs-unsplash.svg',
  '/assets/images/david-travis-WC6MJ0kRzGw-unsplash/david-travis-WC6MJ0kRzGw-unsplash.svg',
  '/assets/images/harley-davidson-4ixHdlcROPI-unsplash/harley-davidson-4ixHdlcROPI-unsplash.svg',
  '/assets/images/greg-rakozy-0LU4vO5iFpM-unsplash/greg-rakozy-0LU4vO5iFpM-unsplash.svg',
  '/assets/images/neringa-sidlauskaite-YGWODwrWi4k-unsplash/neringa-sidlauskaite-YGWODwrWi4k-unsplash.svg',
  '/assets/images/jakob-owens-CiUR8zISX60-unsplash/jakob-owens-CiUR8zISX60-unsplash.svg',
  '/assets/images/ben-hershey-1IZBAlIs4ug-unsplash/ben-hershey-1IZBAlIs4ug-unsplash.svg',
  '/assets/images/josue-isai-ramos-figueroa-Pj4je7OjrME-unsplash/josue-isai-ramos-figueroa-Pj4je7OjrME-unsplash.svg',
  '/assets/images/kai-pilger-1k3vsv7iIIc-unsplash/kai-pilger-1k3vsv7iIIc-unsplash.svg',
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
