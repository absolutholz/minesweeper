<template>
	<section class="high-score-table">
		<h3>{{ difficultyName }}</h3>

		<ol>
			<li
				v-for="(score, index) in highScores" :key="index"
			>
				<time-display
					:includeIcon="false"
					:seconds="score.seconds"
				/>
				<time :datetime="score.timestamp.toISOString()">{{ score.timestamp.toLocaleString(['en-US'], { dateStyle: 'long', timeStyle: 'short' }) }}</time>
			</li>
		</ol>
	</section>
</template>

<script>
import TimeDisplay from './../TimeDisplay';

import { DIFFICULTIES } from './../game/Game';

export default {
	name: 'HighScoreTable',

	components: {
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
 .high-score-table {

 }
 </style>
