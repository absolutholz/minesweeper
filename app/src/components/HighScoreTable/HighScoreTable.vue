<template>
	<section class="high-score-table">
		<h3 class="high-score-table__hdln">Difficulty: {{ difficultyName }}</h3>

		<list-unstyled class="high-score-table__list">
			<li
				v-for="(score, index) in highScores" :key="index"
				class="high-score-table__entry"
				:class="highlightScore === score ? 'high-score-table__entry--highlight' : ''"
			>
				<div>
					<span
						v-if="highlightScore === score"
						class="high-score-table__highlight">last game</span>
					<time-display
						class="high-score-table__score"
						:includeIcon="false"
						:seconds="score.seconds"
					/>
					<time
						class="high-score-table__time"
						:datetime="score.timestamp.toISOString()">{{ score.timestamp.toLocaleString([locale], { dateStyle: 'long', timeStyle: 'short' }) }}</time>
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
		locale () {
			return document.querySelector('html').getAttribute('lang');
		},

		difficultyName () {
			return DIFFICULTIES.find((difficulty) => difficulty.id === this.difficultyKey).name;
		},

		highlightScore () {
			const highlightDifficulty = this.$route.query.difficulty || '';
			const highlightSize = this.$route.query.size || '';
			const highlightPosition = this.$route.query.highlight || '';

			return this.highScores.find((score, index) => {
				console.log(score.difficulty, highlightDifficulty, score.size, highlightSize, index, highlightPosition);
				console.log(score.difficulty === highlightDifficulty, score.size === highlightSize, index === highlightPosition);
				return score.difficulty === highlightDifficulty
					&& score.size === highlightSize
					&& index == highlightPosition;
			});
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
		display: grid;
		grid-auto-rows: 1fr;
		grid-gap: var(--spacing-base) var(--spacing-base);
		grid-template-columns: repeat(auto-fill, Minmax(clamp((100% / 3)#{" - "}var(--spacing-base), 30ch, 100%), 1fr));
		// column-width: 30ch;
		counter-reset: highscores;

		> li {
			// break-inside: avoid;
			// display: flex;
			// flex-direction: column;
			// margin-bottom: var(--spacing-base);
		}
	}

	&__entry {
		align-content: center;
		counter-increment: highscores;
		display: flex;
		padding: var(--spacing-mini);
		position: relative;

		&::before {
			content: counter(highscores) ". ";
			font-size: 3em;
			font-weight: $typography-weight-hairline;
			line-height: 1;
			margin-right: 0.25em;
			margin-top: calc(var(--spacing-mini) * -1);
			text-align: right;
			width: 2ch;
		}

		&--highlight {
			border: 2px solid var(--primary);
			border-radius: 4px;
		}
	}

	&__highlight {
		background: var(--primary);
		border-radius: 4px 4px 0 0;
		bottom: 100%;
		color: var(--on-primary);
		display: inline-block;
		font-size: var(--typo-size-micro);
		font-weight: $typography-weight-bold;
		left: var(--spacing-micro);
		line-height: 1;
		padding: 0.25em 1em;
		position: absolute;
		text-transform: uppercase;
	}

	&__score {
		font-size: var(--typo-size-mega);
		font-weight: $typography-weight-bold;
		line-height: 1;
		margin-right: var(--spacing-base);
		min-width: 0;
	}

	&__time {
		display: block;
		font-size: var(--typo-size-micro);
	}
}
</style>
