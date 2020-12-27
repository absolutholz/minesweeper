<template>
	<figure class="difficulty-graphic">
		<div
			class="difficulty-graphic__grid"
			v-if="difficulty === 'simple'"
		>
			<div class="difficulty-graphic__row">
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
			</div>
		</div>
		<div
			class="difficulty-graphic__grid"
			v-if="difficulty === 'medium'"
		>
			<div class="difficulty-graphic__row">
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
			</div>
		</div>
		<div
			class="difficulty-graphic__grid"
			v-if="difficulty === 'hard'"
		>
			<div class="difficulty-graphic__row">
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
			</div>
			<div class="difficulty-graphic__row">
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
			</div>
		</div>
		<div
			class="difficulty-graphic__grid"
			v-if="difficulty === 'expert'"
		>
			<div class="difficulty-graphic__row">
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
			</div>
			<div class="difficulty-graphic__row">
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
				<div class="difficulty-graphic__field"><svg-mine class="icon" /></div>
			</div>
		</div>
		<figcaption><slot /></figcaption>
	</figure>
</template>

<script>
import SvgMine from '@mdi/svg/svg/mine.svg';

import { DIFFICULTIES } from './../game/Game';

export default {
	name: 'DifficultyGraphic',

	components: {
		SvgMine,
	},

	props: {
		difficulty: {
			required: true,
			type: String,
			validator: function (value) {
				return DIFFICULTIES.find((difficulty) => difficulty.id === value);
			},
		},
	},
};
</script>

<style lang="scss">
.difficulty-graphic {
	&__grid {
		font-difficulty: 20px;
	}

	&__row {
		display: flex;
		justify-content: center;
	}

	&__field {
		margin: 0.125em;
	}
}
</style>
