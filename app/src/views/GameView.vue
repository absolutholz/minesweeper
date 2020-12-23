<template>
	<main>
		<game
			:fieldCount="$route.query.fieldCount * 1 || 81"
			:mineCount="$route.query.mineCount * 1 || 10"
		/>
	</main>
</template>

<script>

/*
Easy	|	9x9 	|	10
Medium	|	16x16	|	39
Expert	|	30x16	|	95
*/

import Game from './../components/game/Game';

export default {
	name: 'GameView',

	components: {
		Game,
	},
};
</script>
