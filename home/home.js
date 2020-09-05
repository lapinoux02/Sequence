Vue.component('home', {
	props: ['levels'],
	template: `<div id="home">
		<div v-for="level in levels" class="button" @click="newGame(level)" :key="level.name">{{level.name}}</div>
	</div>`,
	methods: {
		newGame(level) {
			this.$emit('newgame', level);
		}
	}
})