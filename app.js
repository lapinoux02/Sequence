// Gestion service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/Sequence/serviceWorker.js', {scope: '/Sequence/'});
	});
}

let app = new Vue({
	el: '#app',
	data() {
		return {
			levels: [{
				name: 'Burst',
				frequency: (e, x = 55 - e.timer%55) => [1,3,6,10,15,21,28,36,45,55].some(e => e === x),
				strength: i => 0,
				sleep: 50000
			}, {
				name: 'Acceleration',
				frequency: (e, diff = e.timer - e.lastTick) => !(diff%(10 - Math.min(Math.floor(e.lastTick / 50), 9))),
				strength: i => 0,
				sleep: 50000
			}, {
				name: 'Random',
				frequency: e => !Math.floor(Math.random()*8),
				strength: i => Math.floor(Math.random()*2),
				sleep: 50000
			}, {
				name: 'Infinity',
				frequency: e => e.rings < 4,
				strength: i => 0,
				sleep: 50000
			}],
			screen: 'home',
			stats: null,
			currentLevel: null
		}
	},
	methods: {
		endGame(event) {
			this.stats = event;
			this.screen = 'stats';
		},
		newGame(level = this.currentLevel) {
			this.currentLevel = level;
			this.screen = 'board';
		},
		goHome() {
			this.screen = 'home'
		}
	}
})