Vue.component('graph', {
	props: {
		dots: Array,
		minY: {
			default: Infinity
		},
		maxY: {
			default: -Infinity
		}
	},
	data() {
		return {
			realHeight: 0,
			realWidth: 0,
			xOffset: 0,
			yOffset: 0
		}
	},
	computed: {
		xRange() {
			return Math.max(...this.dots.map(e => e.x)) - Math.min(...this.dots.map(e => e.x)) || 1;
		},
		yRange() {
			return Math.max(...this.dots.map(e => e.y), this.maxY) - Math.min(...this.dots.map(e => e.y), this.minY) || 1;
		},
		xMin() {
			return Math.min(...this.dots.map(e => e.x));
		},
		yMax() {
			return Math.max(...this.dots.map(e => e.y), this.maxY);
		}
	},
	template: `<div class="graph">
		<div class="writeZone">{{yMax}}</div>
		<div class="graphZone" ref="graphZone">
			<div class="dot" v-for="dot in dots" :style="getDotStyle(dot)"></div>
		</div>
	</div>`,
	methods: {
		getDotStyle(dot) {
			return {
				left: `${this.realWidth * (dot.x - this.xMin) / this.xRange + this.xOffset}px`,
				top: `${this.realHeight * (this.yMax - dot.y) / this.yRange + this.yOffset}px`
			}
		}
	},
	mounted() {
		let el = this.$refs.graphZone;
		this.realHeight = el.scrollHeight;
		this.realWidth = el.scrollWidth;
		this.xOffset = el.offsetLeft;
		this.yOffset = el.offsetTop;
	}
})