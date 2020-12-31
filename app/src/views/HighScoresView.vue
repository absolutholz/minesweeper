<template>
	<main>
		<page-section>
			<container>
				<page-hdln>High Scores</page-hdln>
			</container>
		</page-section>

		<page-section>
			<container>
				<div
					v-if="trigger"
				>
					<high-score-section
						v-for="(size, index) in highScores" :key="index"
						:sizeKey="index"
						:difficulties="size"
					/>
				</div>

				<btn
					:to="{ name: 'Config' }"
					variant="contained"
				>
					<svg-home class="icon" />
					New Game
				</btn>

			</container>
		</page-section>
	</main>
</template>

<script>
import Btn from './../components/Btn';
import Container from './../components/Container';
import PageHdln from './../components/PageHdln';
import PageSection from './../components/PageSection';
import HighScoreSection from './../components/HighScoreSection';

import SvgHome from '@mdi/svg/svg/home.svg';

import { readHighScores } from './../localDb';

export default {
	name: 'HighScoresView',

	components: {
		Btn,
		Container,
		HighScoreSection,
		PageHdln,
		PageSection,

		SvgHome,
	},

	data () {
		return {
			highScores: {},
			trigger: null,
		};
	},

	async mounted () {
		const highScores = await readHighScores();
		highScores
			.sort((a, b) => {
				// https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields/20554416#20554416
				return a.seconds - b.seconds;
			})
			.forEach((score) => {
				if (!this.highScores[score.size]) {
					this.highScores[score.size] = {};
				}
				if (!this.highScores[score.size][score.difficulty]) {
					this.highScores[score.size][score.difficulty] = [];
				}

				this.highScores[score.size][score.difficulty].push(score);
			});
		this.trigger = Math.random();
	},
};
</script>
