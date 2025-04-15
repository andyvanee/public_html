// Service Worker for LastBlock PWA

const CACHE_NAME = 'lastblock-cache-v1'
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './entrypoint.js',
    './main.css',
    './favicon.svg',
    './manifest.json',
    './icons/lastblock-icon.svg',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
]

// Install event - cache all essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app assets')
                return cache.addAll(ASSETS_TO_CACHE)
            })
            .then(() => self.skipWaiting()), // Force activation on all clients
    )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keyList) => {
                return Promise.all(
                    keyList.map((key) => {
                        if (key !== CACHE_NAME) {
                            console.log('Removing old cache', key)
                            return caches.delete(key)
                        }
                    }),
                )
            })
            .then(() => self.clients.claim()), // Take control of clients immediately
    )
})

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found
            if (response) {
                return response
            }

            // Clone the request to make it usable again
            const fetchRequest = event.request.clone()

            // Go to the network
            return fetch(fetchRequest)
                .then((response) => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response
                    }

                    // Clone the response to use it and store it in cache
                    const responseToCache = response.clone()

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache)
                    })

                    return response
                })
                .catch(() => {
                    // Return a fallback for failed responses
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('./index.html')
                    }
                })
        }),
    )
})
