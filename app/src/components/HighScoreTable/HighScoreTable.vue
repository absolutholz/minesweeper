<template>
	<section class="high-score-table">
		<h3 class="high-score-table__hdln">Difficulty: {{ difficultyName }}</h3>

		<list-unstyled class="high-score-table__list">
			<li
				v-for="(score, index) in highScores" :key="index"
			>
				<div>
					<time-display
						class="high-score-table__score"
						:includeIcon="false"
						:seconds="score.seconds"
					/>
					<time
						class="high-score-table__time"
						:datetime="score.timestamp.toISOString()">{{ score.timestamp.toLocaleString(['en-US'], { dateStyle: 'long', timeStyle: 'short' }) }}</time>
				</div>
			</li>
		</list-unstyled>
	</section>
</template>

<script>
import ListUnstyled from './../ListUnstyled';
import TimeDisplay from './../TimeDisplay';

import { DIFFICULTIES } from './../game/Game';

export default {
	name: 'HighScoreTable',

	components: {
		ListUnstyled,
		TimeDisplay,
	},

	props: {
		difficultyKey: {
			required: true,
			type: String,
			validator: function (value) {
				return DIFFICULTIES.find((difficulty) => difficulty.id === value);
			},
		},

		highScores: {
			required: true,
			type: Array,
		},
	},

	computed: {
		difficultyName () {
			return DIFFICULTIES.find((difficulty) => difficulty.id === this.difficultyKey).name;
		},
	},
 };
 </script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

.high-score-table {
	&__hdln {

	}

	&__list {
		column-width: 30ch;
		counter-reset: highscores;

		> li {
			align-content: center;
			break-inside: avoid;
			counter-increment: highscores;
			display: flex;
			margin-bottom: var(--spacing-mega);

			&::before {
				content: counter(highscores) ". ";
				font-size: 3em;
				font-weight: $typography-weight-hairline;
				line-height: 1;
				margin-right: 0.25em;
				margin-top: calc(var(--spacing-mini) * -1);
			}
		}
	}

	&__score {
		font-weight: $typography-weight-bold;
	}

	&__time {
		display: block;
		font-size: var(--typo-size-micro);

		// &::before {
		// 	content: "-";
		// 	display: inline-block;
		// 	margin-right: 0.5em;
		// }
	}
}
</style>
