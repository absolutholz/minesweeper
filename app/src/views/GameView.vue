<template>
	<main>
		<game
			:fieldCount="$route.query.fieldCount * 1 || 64"
			:mineCount="$route.query.mineCount * 1 || 12"
		/>
	</main>
</template>

<script>
import Game from './../components/game/Game';

export default {
	name: 'GameView',

	components: {
		Game,
	},
};
</script>
