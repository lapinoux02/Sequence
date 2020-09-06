const sw = 'sequence-v1'
const assets = [
	'/index.html',
	'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js',
	'/app.js',
	'/globals.js',
	'/stats/stats.js',
	'/ring/ring.js',
	'/board/board.js',
	'/graph/graph.js',
	'/home/home.js',
	'/app.css',
	'/board/board.css',
	'/stats/stats.css',
	'/ring/ring.css',
	'/graph/graph.css',
	'/home/home.css',
	'/ressources/icon192.png',
	'/ressources/icon512.png'
];

self.addEventListener('install', installEvent => {
	self.skipWaiting();
	installEvent.waitUntil(
		caches.open(sw).then(cache => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request);
		})
	);
});