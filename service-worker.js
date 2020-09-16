const CACHE_MAIN = 'main1600229060238';
const precacheList = [
  
  '/',
  '/2020/got-100-lighthouse-score-in-all-categories-on-mobile.html',
  '/2020/logical-assignment-operators.html',
  '/2020/fragmenting-flex-layout.html',
  '/2020/flex-layout-algorithm.html',
  '/2020/flex-alignment.html',
  '/2020/components-of-flexibility.html',
  '/2020/flex-shorthand.html',
  '/2020/flex-lines.html',
  '/2020/flex-order-property.html',
  '/2020/flex-flow-shorthand.html',
  '/assets/images/ben-koorengevel-tpIWpoW3_Wc-unsplash/ben-koorengevel-tpIWpoW3_Wc-unsplash.svg',
  '/assets/images/cath-smith-PF5_cqOQFT4-unsplash/cath-smith-PF5_cqOQFT4-unsplash.svg',
  '/assets/images/tomas-malik-zlSzh2FP7LY-unsplash/tomas-malik-zlSzh2FP7LY-unsplash.svg',
  '/assets/images/sarah-madaio-fpZHGVBzlYk-unsplash/sarah-madaio-fpZHGVBzlYk-unsplash.svg',
  '/assets/images/600484slsdl/600484slsdl.svg',
  '/assets/images/700244ansdl/700244ansdl.svg',
  '/assets/images/steve-douglas-80Pr_AfC71Y-unsplash/steve-douglas-80Pr_AfC71Y-unsplash.svg',
  '/assets/images/alex-chernenko-To28QYvt5q4-unsplash/alex-chernenko-To28QYvt5q4-unsplash.svg',
  '/assets/images/estudio-bloom-ezqnxsqUZ80-unsplash/estudio-bloom-ezqnxsqUZ80-unsplash.svg',
  '/assets/images/ben-mcleod-2UfVYE2S7B4-unsplash/ben-mcleod-2UfVYE2S7B4-unsplash.svg',
  '/css/prism.css',
  '/css/global_async.css',
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
