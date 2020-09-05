Vue.component('stats', {
	props: ['stats'],
	data() {
		return {
			dataTypes: [{
				name: 'Click gap',
				dataRead: e => ({x: e.createdTime, y: e.clickedTime - e.createdTime}),
				minY: 0
			}, {
				name: 'Miss clicks',
				dataRead: e => ({x: e.createdTime, y: e.missClicks}),
				minY: 0
			}, {
				name: 'Accuracy',
				dataRead: e => ({x: e.createdTime, y: 100 * (e.index + 1) / (e.index + 1 + e.missClicks)}),
				minY: 0,
				maxY: 100
			}, {
				name: 'Local accuracy',
				dataRead: e => ({x: e.createdTime, y: e.localMissClicks}),
				minY: 0
			}, {
				name: 'Precision',
				dataRead: e => ({x: e.createdTime, y: e.clickPrecision}),
				minY: 0,
				maxY: 1
			}],
			selectedDataTypeIndex: 0
		}
	},
	computed: {
		dots() {
			return this.stats.data.map(this.dataTypes[this.selectedDataTypeIndex].dataRead);
		},
		minY() {
			return this.dataTypes[this.selectedDataTypeIndex].minY;
		},
		maxY() {
			return this.dataTypes[this.selectedDataTypeIndex].maxY;
		}
	},
	template: `<div id="stats">
		<div id="header">{{stats.msg}}</div>
		<div id="body">
			<div id="graphZone">
				<div id="dataSelection">
					<div :class="['dataSelectionButton', selectedDataTypeIndex === i ? 'selected' : '']"
						v-for="(dataType, i) in dataTypes"
						@click="modifyData(i)"
					>{{dataType.name}}</div>
				</div>
				<div id="graph">
					<graph :dots="dots" :minY="minY" :maxY="maxY"></graph>
				</div>
			</div>
			<div class="buttons">
				<div class="button" @click="newGame">Retry</div>
				<div class="button" @click="goHome">Home</div>
			</div>
		</div>
	</div>`,
	methods: {
		newGame() {
			this.$emit('newgame');
		},
		goHome() {
			this.$emit('gohome');
		},
		modifyData(index) {
			this.selectedDataTypeIndex = index;
		}
	}
})