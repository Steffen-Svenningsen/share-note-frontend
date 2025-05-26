importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
    ({request}) => 
        request.destination === 'image' || 
        request.destination === 'script' || 
        request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-assets',
    })
);