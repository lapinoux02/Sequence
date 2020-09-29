Vue.component('board', {
	props: ['frequency', 'strength', 'sleep'],
	data() {
		return {
			rings: [], // La liste des cercles présents sur l'écran
			clickedRings: [], // La liste des cercles qui ont été cliqués
			missClicks: 0, // Le nombre de click ratés depuis le débuts
			localMissClicks: 0, // Le nombre de click ratés depuis la dernière bulles
			nextIndex: 0, // L'index du prochain cercle qui apparaitra à l'écran
			currentIndex: 0, // L'index du cercle à cliquer
			interval: null, // L'interval qui compte les 1/10sec
			sleepTimeout: null, // Le timeout qui gère les afk
			timer: 0, // Le temps passé en 1/10sec
			lastTick: 0 // Le dernier moment où la fréquence du jeu à changé
		}
	},
	template: `<div id="board" @touchstart="click">
		<ring v-for="ring in rings"
			:x="ring.x"
			:y="ring.y"
			:strength="ring.strength"
			@clicked="click($event, ring)"
			:key="ring.index"
		></ring>
	</div>`,
	methods: {
		click(event, ring) {
			if (!ring) {
				this.missClicks++;
				this.localMissClicks++;
			} else if (ring.index === this.currentIndex) {
				// Retrait de la bulle
				let clickedRing = this.rings.shift();

				// Récupération de toutes les données
				clickedRing.clickedTime = this.timer;
				clickedRing.missClicks = this.missClicks;
				clickedRing.localMissClicks = this.localMissClicks;
				this.localMissClicks = 0;
				let target = event.currentTarget;
				let radius = target.scrollHeight / 2;
				clickedRing.clickPrecision = 1 - (Math.sqrt(Math.pow(target.offsetLeft + radius - event.changedTouches[0].clientX, 2) + Math.pow(target.offsetTop + radius - event.changedTouches[0].clientY, 2)) / radius);
				
				// Ajout de la bulle aux bulles cliquées
				this.clickedRings.push(clickedRing);
				this.currentIndex++;
				this.resetAfkTimer();
			} else {
				this.openEndGameScreen('Wrong bubble!');
			}
		},
		getNewCoordinates() {
			let boardElement = document.getElementById('board');
			let ringDiameterPixel = boardElement.scrollWidth / 100 * CONF.ringDiameter;
			let marginPixel = boardElement.scrollWidth / 100 * CONF.margin;
			for (let i = 0; i < 200; i++) {
				let potentialY = Math.random() * (boardElement.scrollHeight - ringDiameterPixel - 2*marginPixel) + marginPixel;
				let potentialX = Math.random() * (boardElement.scrollWidth - ringDiameterPixel - 2*marginPixel) + marginPixel;
				
				if (!this.rings.some(ring => Math.sqrt(Math.pow(ring.x - potentialX, 2) + Math.pow(ring.y - potentialY, 2)) < ringDiameterPixel + marginPixel)) {
					return {
						x: potentialX,
						y: potentialY
					}
				}
			}
			
			throw new Error('NoSpaceLeftOnBoard');
		},
		resetAfkTimer() {
			clearTimeout(this.sleepTimeout);
			this.sleepTimeout = setTimeout(() => {
				this.openEndGameScreen('Are you asleep ?')
			}, this.sleep)
		},
		openEndGameScreen(msg) {
			clearInterval(this.interval);
			clearTimeout(this.sleepTimeout);
			this.$emit('endgame', {
				msg,
				data: this.clickedRings
			});
		}
	},
	created() {
		this.interval = setInterval(() => {
			this.timer++;
			if (this.frequency({
				timer: this.timer,
				lastTick: this.lastTick,
				rings: this.rings.length
			})) {
				try {
					let newRingCoordinates = this.getNewCoordinates();
					this.rings.push({
						x: newRingCoordinates.x,
						y: newRingCoordinates.y,
						strength: this.strength(this.nextIndex),
						index: this.nextIndex++,
						createdTime: this.timer
					});
					this.lastTick = this.timer;
				} catch (e) {
					this.openEndGameScreen('No more space on board!');
				}
			}
		}, 100);
		this.resetAfkTimer();
	}
});