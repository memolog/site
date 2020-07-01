const CACHE_MAIN = 'main1593593193834';
const precacheList = [
  
  '/',
  '/2020/components-of-flexibility.html',
  '/2020/flex-shorthand.html',
  '/2020/flex-lines.html',
  '/2020/flex-order-property.html',
  '/2020/flex-flow-shorthand.html',
  '/2020/flex-wrap-property.html',
  '/2020/flex-flow-direction.html',
  '/2020/automatic-minimum-size-of-flex-items.html',
  '/2020/flex-collpased-items.html',
  '/2020/flex-item-margin-padding-and-z-ordering.html',
  '/assets/images/700244ansdl/700244ansdl.svg',
  '/assets/images/steve-douglas-80Pr_AfC71Y-unsplash/steve-douglas-80Pr_AfC71Y-unsplash.svg',
  '/assets/images/alex-chernenko-To28QYvt5q4-unsplash/alex-chernenko-To28QYvt5q4-unsplash.svg',
  '/assets/images/estudio-bloom-ezqnxsqUZ80-unsplash/estudio-bloom-ezqnxsqUZ80-unsplash.svg',
  '/assets/images/ben-mcleod-2UfVYE2S7B4-unsplash/ben-mcleod-2UfVYE2S7B4-unsplash.svg',
  '/assets/images/jerry-wang-xiie4XeSzTU-unsplash/jerry-wang-xiie4XeSzTU-unsplash.svg',
  '/assets/images/juliana-arruda-iVPWGCbFwd8-unsplash/juliana-arruda-iVPWGCbFwd8-unsplash.svg',
  '/assets/images/febiyan-z85gD0sTOQ0-unsplash/febiyan-z85gD0sTOQ0-unsplash.svg',
  '/assets/images/nong-vang-w5tI4WACAKo-unsplash/nong-vang-w5tI4WACAKo-unsplash.svg',
  '/assets/images/marc-klemm-rXDoLi1nqJo-unsplash/marc-klemm-rXDoLi1nqJo-unsplash.svg',
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
