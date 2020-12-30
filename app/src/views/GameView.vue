<template>
	<main>
		<game
			:fieldCount="fieldCount"
			:mineCount="mineCount"
		/>
	</main>
</template>

<script>

/*
Easy	|	9x9 	|	10
Medium	|	16x16	|	39
Expert	|	30x16	|	95
*/

import Game, { SIZES, DIFFICULTIES } from './../components/game/Game';

export default {
	name: 'GameView',

	components: {
		Game,
	},

	computed: {
		fieldCount () {
			const sizeParam =  this.$route.query.size;
			const size = SIZES.find((size) => size.id === sizeParam);
			return (size || SIZES[Math.floor(SIZES.length / 2)]).fieldCount;
		},

		mineCount () {
			const difficultyParam =  this.$route.query.difficulty;
			const difficulty = DIFFICULTIES.find((difficulty) => difficulty.id === difficultyParam);
			return Math.round(this.fieldCount * (difficulty || DIFFICULTIES[1]).mineRatio);
		},
	},
};
</script>
