const sw = 'sequence-v1'
const assets = [
	'/Sequence/index.html',
	'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js',
	'/Sequence/app.js',
	'/Sequence/globals.js',
	'/Sequence/stats/stats.js',
	'/Sequence/ring/ring.js',
	'/Sequence/board/board.js',
	'/Sequence/graph/graph.js',
	'/Sequence/home/home.js',
	'/Sequence/app.css',
	'/Sequence/board/board.css',
	'/Sequence/stats/stats.css',
	'/Sequence/ring/ring.css',
	'/Sequence/graph/graph.css',
	'/Sequence/home/home.css',
	'/Sequence/ressources/icon192.png',
	'/Sequence/ressources/icon512.png'
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