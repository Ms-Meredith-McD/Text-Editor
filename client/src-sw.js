const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Set up page cache
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// build caching with register route
// workbox
// StaleWhileRevalidate
// cacheableResponsePlugin
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// we only want to register a route if the requested destination contains "style", "script", or "worker". So, first, create an array with these three strings.
const paths = ["style", "script", "worker"];

// reference whatever destination is being sought. This is part of the {request} object being injected below. So we would get that value from request.destination
//verify that the requested destination contains one item in that array
// instantiate the strategy we wish to use
paths.includes(request.destination)
registerRoute( ({ request }) => paths.includes(request.destination),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new workbox.cacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);


