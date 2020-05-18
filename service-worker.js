const CACHE_MAIN = 'main1589795498584';
const precacheList = [
  
  '/',
  '/2020/automatic-minimum-size-of-flex-items.html',
  '/2020/flex-collpased-items.html',
  '/2020/flex-item-margin-padding-and-z-ordering.html',
  '/2020/absolutely-positioned-flex-children.html',
  '/2020/flex-items.html',
  '/2020/flex-containers.html',
  '/2020/flex-layout-box-model-and-terminology.html',
  '/2020/css-flexible-box-layout-module-introduction.html',
  '/2020/display-module-glossary.html',
  '/2020/automatic-box-type-transformations.html',
  '/assets/images/febiyan-z85gD0sTOQ0-unsplash/febiyan-z85gD0sTOQ0-unsplash.svg',
  '/assets/images/nong-vang-w5tI4WACAKo-unsplash/nong-vang-w5tI4WACAKo-unsplash.svg',
  '/assets/images/marc-klemm-rXDoLi1nqJo-unsplash/marc-klemm-rXDoLi1nqJo-unsplash.svg',
  '/assets/images/patrick-schneider-8bPJ0vagphw-unsplash/patrick-schneider-8bPJ0vagphw-unsplash.svg',
  '/assets/images/vincent-van-zalinge-8bOwZ8ag9UY-unsplash/vincent-van-zalinge-8bOwZ8ag9UY-unsplash.svg',
  '/assets/images/wengang-zhai-rNO0c2rlVUo-unsplash/wengang-zhai-rNO0c2rlVUo-unsplash.svg',
  '/assets/images/greg-jeanneau-ZUSyn7L6o68-unsplash/greg-jeanneau-ZUSyn7L6o68-unsplash.svg',
  '/assets/images/mick-haupt-XMLRK8xpEIs-unsplash/mick-haupt-XMLRK8xpEIs-unsplash.svg',
  '/assets/images/francesco-ungaro-JHypHcOObf4-unsplash/francesco-ungaro-JHypHcOObf4-unsplash.svg',
  '/assets/images/jeremy-bishop-t52E8yzCURM-unsplash/jeremy-bishop-t52E8yzCURM-unsplash.svg',
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
