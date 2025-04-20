// Service Worker for Shortest Path Finder
const CACHE_NAME = 'shortest-path-cache-v1'
const ASSETS = [
    '/',
    '/index.html',
    '/entrypoint.js',
    '/main.css',
    '/manifest.json',
    '/favicon.svg',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    '/icons/path-icon.svg',
]

// Install event - cache assets
self.addEventListener('install', async (event) => {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(ASSETS)
    // Activate immediately
    self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
    // Ensure service worker takes control immediately
    await clients.claim()
})

// Fetch event - serve from cache first, fall back to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const cachedResponse = await caches.match(event.request)
            if (cachedResponse) {
                return cachedResponse
            }

            try {
                const networkResponse = await fetch(event.request)
                // Clone the response before returning it
                const cache = await caches.open(CACHE_NAME)
                cache.put(event.request, networkResponse.clone())
                return networkResponse
            } catch (error) {
                return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } })
            }
        })(),
    )
})
