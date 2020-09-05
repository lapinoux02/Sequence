let app = new Vue({
	el: '#app',
	data() {
		return {
			levels: [{
				name: 'Burst',
				frequency: (timer, lastTick, x = 55 - timer%55) => [1,3,6,10,15,21,28,36,45,55].some(e => e === x),
				strength: i => 0,
				sleep: 50000
			}, {
				name: 'Acceleration',
				frequency: (timer, lastTick, diff = timer - lastTick) => !(diff%(10 - Math.min(Math.floor(lastTick / 50), 9))),
				strength: i => 0,
				sleep: 50000
			}, {
				name: 'Random',
				frequency: () => !Math.floor(Math.random()*8),
				strength: i => Math.floor(Math.random()*2),
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