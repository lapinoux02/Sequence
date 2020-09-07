Vue.component('ring', {
	props: ['x', 'y', 'strength'],
	data() {
		return {
			conf: CONF,
			style: {
				'--top': this.y,
				'--left': this.x,
				'--size': CONF.ringDiameter
			},
			currentStrength: this.strength
		}
	},
	computed: {
		classes() {
			return ['ring', `lvl${this.currentStrength || 0}`]
		}
	},
	template: `<transition name="ring" appear>
		<div ref="ring"
			:class="classes"
			:style="style"
			@touchstart="clicked"
		>
		</div>
	</transition>`,
	methods: {
		clicked(e) {
			e.stopPropagation();
			if (!this.currentStrength) {
				this.$emit('clicked', e);				
				return;
			}
			this.currentStrength--;
			this.$el.animate({
				width: ['calc(var(--size) * 1vw)', 'calc(var(--size) * 1.5 * 1vw)', 'calc(var(--size) * 1vw)'],
				height: ['calc(var(--size) * 1vw)', 'calc(var(--size) * 1.5 * 1vw)', 'calc(var(--size) * 1vw)'],
				marginTop: [0, 'calc(var(--size) / 3 * -1vw)', 0],
				marginLeft: [0, 'calc(var(--size) / 3 * -1vw)', 0]
			}, {
				duration: 150
			})
		}
	}
});