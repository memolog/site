const CACHE_MAIN = 'main1584693958410';
const precacheList = [
  
  '/',
  '/2020/flex-containers.html',
  '/2020/flex-layout-box-model-and-terminology.html',
  '/2020/css-flexible-box-layout-module-introduction.html',
  '/2020/display-module-glossary.html',
  '/2020/automatic-box-type-transformations.html',
  '/2020/display-value-property-3.html',
  '/2020/display-value-property-2.html',
  '/2020/display-value-property.html',
  '/2020/css-flow-layout.html',
  '/2020/formatting-context.html',
  '/assets/images/wengang-zhai-rNO0c2rlVUo-unsplash/wengang-zhai-rNO0c2rlVUo-unsplash.svg',
  '/assets/images/greg-jeanneau-ZUSyn7L6o68-unsplash/greg-jeanneau-ZUSyn7L6o68-unsplash.svg',
  '/assets/images/mick-haupt-XMLRK8xpEIs-unsplash/mick-haupt-XMLRK8xpEIs-unsplash.svg',
  '/assets/images/francesco-ungaro-JHypHcOObf4-unsplash/francesco-ungaro-JHypHcOObf4-unsplash.svg',
  '/assets/images/jeremy-bishop-t52E8yzCURM-unsplash/jeremy-bishop-t52E8yzCURM-unsplash.svg',
  '/assets/images/whoisbenjamin-ApJp5Nk24a0-unsplash/whoisbenjamin-ApJp5Nk24a0-unsplash.svg',
  '/assets/images/glen-hooper-8LWtpfhGP4U-unsplash/glen-hooper-8LWtpfhGP4U-unsplash.svg',
  '/assets/images/pawel-czerwinski-31xVIgIXbws-unsplash/pawel-czerwinski-31xVIgIXbws-unsplash.svg',
  '/assets/images/boris-smokrovic-HWwF4OnXAdM-unsplash/boris-smokrovic-HWwF4OnXAdM-unsplash.svg',
  '/assets/images/cameron-venti-QUt6Ww8OQx0-unsplash/cameron-venti-QUt6Ww8OQx0-unsplash.svg',
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
