<template>
	<section class="high-score-section">
		<h2>{{ sizeName }}</h2>

		<high-score-table
			v-for="(difficulty, index) in difficulties" :key="index"
			:difficultyKey="index"
			:highScores="difficulty"
		/>
	</section>
</template>

 <script>
 import HighScoreTable from './../HighScoreTable';

 import { SIZES } from './../game/Game';

 export default {
	name: 'HighScoreSection',

	components: {
		HighScoreTable,
	},

	props: {
		sizeKey: {
			required: true,
			type: String,
			validator: function (value) {
				return SIZES.find((size) => size.id === value);
			},
		},

		difficulties: {
			required: true,
			type: Object,
		},
	},

	computed: {
		sizeName () {
			return SIZES.find((size) => size.id === this.sizeKey).name;
		},
	},
 };
 </script>

 <style lang="scss">
 .high-score-section {

 }
 </style>
