<template>
	<board>
		<grid
			@detonated="loseGame"
			@revealed="updateRevealedCount"
			@update="updateMineCount"
			:disable="isGameOver"
			:fieldCount="fieldCount"
			:mineCount="mineCount"
			ref="grid"
		/>

		<pause-screen
			v-if="isPaused"
			@click.native="resume"
		/>

		<win-screen
			v-if="isGameWon"
			@restart="restart"
		/>

		<lose-screen
			v-if="isGameLost"
			@restart="restart"
		/>

		<template #status>
			<status
				:mineCount="minesLeft"
				:secondsPlayed="secondsPlayed"
			/>
		</template>

		<template #actions>
			<btn-list class="actions">

				<btn
					@click="isPaused ? resume() : pause()"
					:disabled="isStopped"
				>
					<svg-pause class="icon" />
				</btn>
				<btn
					@click="restart"
				>
					<svg-restart class="icon" />
				</btn>
				<btn
					:to="{ name: 'Config' }"
				>
					<svg-home class="icon" />
				</btn>

			</btn-list>
		</template>
	</board>
</template>

<script>
import Board from './../Board';
import Btn from './../../Btn';
import BtnList from './../../BtnList';
import Grid from './../Grid';
import LoseScreen from './../LoseScreen';
import PauseScreen from './../PauseScreen';
import Status from './../Status';
import WinScreen from './../WinScreen';

import SvgHome from '@mdi/svg/svg/home.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';
import SvgPause from '@mdi/svg/svg/pause.svg';

import Timer from './../../../js/Timer';
import { createHighScore, readHighScores, deleteHighScore } from './../../../localDb';

export const STATE_GAME_NOT_STARTED = 'game_not_started';
export const STATE_GAME_PLAYING = 'game_playing';
export const STATE_GAME_PAUSED = 'game_paused';
export const STATE_GAME_WON = 'game_won';
export const STATE_GAME_LOST = 'game_lost';

export const SIZES = [
	{
		id: 'xs',
		name: 'Extra Small',
		description: '25 fields',
		fieldCount: 25,
	},
	{
		id: 'sm',
		name: 'Small',
		description:'49 fields',
		fieldCount: 49,
	},
	{
		id: 'md',
		name: 'Medium',
		description: '81 fields',
		fieldCount: 81,
	},
	{
		id: 'lg',
		name: 'Large',
		description:'121 fields',
		fieldCount: 121,
	},
	{
		id: 'xl',
		name: 'Extra Large',
		description: '144 fields',
		fieldCount: 144,
	},
];

export const DIFFICULTIES = [
	{
		id: 'simple',
		name: 'Simple',
		mineRatio: 0.1,
	},
	{
		id: 'medium',
		name: 'Medium',
		mineRatio: 0.15,
	},
	{
		id: 'hard',
		name: 'Hard',
		mineRatio: 0.2,
	},
	{
		id: 'expert',
		name: 'Expert',
		mineRatio: 0.25,
	},
];

export default {
	name: 'Game',

	components: {
		Board,
		Btn,
		BtnList,
		Grid,
		LoseScreen,
		PauseScreen,
		Status,
		WinScreen,

		SvgHome,
		SvgRestart,
		SvgPause,
	},

	props: {
		fieldCount: {
			required: true,
			type: Number,
		},

		mineCount: {
			required: true,
			type: Number,
		}
	},

	data () {
		return {
			flagCount: 0,
			revealedCount: 0,
			score: 0,
			secondsPlayed: 0,
			state: STATE_GAME_NOT_STARTED,
			timer: null,
		};
	},

	computed: {
		minesLeft () {
			return this.mineCount - this.flagCount;
		},

		isPlaying () {
			return this.state === STATE_GAME_PLAYING;
		},

		isPaused () {
			return this.state === STATE_GAME_PAUSED;
		},

		isStopped () {
			return this.state !== STATE_GAME_PLAYING && this.state !== STATE_GAME_PAUSED;
		},

		isGameOver () {
			return this.state === STATE_GAME_WON || this.state === STATE_GAME_LOST;
		},

		isGameWon () {
			return this.state === STATE_GAME_WON;
		},

		isGameLost () {
			return this.state === STATE_GAME_LOST;
		}
	},

	methods: {
		updateMineCount (data) {
			this.flagCount = data.flags;

			if (this.flagCount === this.mineCount && this.revealedCount + this.mineCount === this.fieldCount) {
				this.winGame();
			}
		},

		updateRevealedCount () {
			this.revealedCount += 1;

			if (this.flagCount === this.mineCount && this.revealedCount + this.mineCount === this.fieldCount) {
				this.winGame();
			}
		},

		loseGame () {
			this.timer.stop();
			this.state = STATE_GAME_LOST;
		},

		async winGame () {
			this.timer.stop();
			this.state = STATE_GAME_WON;

			const size = this.$route.query.size;
			const difficulty = this.$route.query.difficulty;

			let highScores = await readHighScores();
			highScores = highScores
				.filter((score) => score.size === size && score.difficulty === difficulty)
				.sort((a, b) => {
					// https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields/20554416#20554416
					return a.seconds - b.seconds;
				});
			const position = highScores.findIndex((score) => this.secondsPlayed <= score.seconds);

			if (position < 10) {
				console.log(`made the top 10 @ ${ position + 1 }`);
				createHighScore({
					name: 'player unknown',
					seconds: this.secondsPlayed,
					size: size,
					difficulty: difficulty,
					fields: this.fieldCount,
					mines: this.mineCount,
					timestamp: new Date(),
				});

				if (highScores.length > 9) {
					highScores.slice(9).forEach((score) => deleteHighScore(score.id));
				}

			} else {
				console.log(`not one of your 10 best @ ${ position + 1 }`);
			}
		},

		start () {
			if (!this.timer) {
				this.timer = Timer(1000);
				this.timer.addObserver({
					update: () => {
						this.secondsPlayed += 1;
					},
				});
			}
			this.timer.start();
			this.state = STATE_GAME_PLAYING;
		},

		pause () {
			this.timer.stop();
			this.state = STATE_GAME_PAUSED;
		},

		resume () {
			this.timer.start();
			this.state = STATE_GAME_PLAYING;
		},

		restart () {
			this.state = STATE_GAME_NOT_STARTED;
			this.timer.stop();

			this.flagCount = 0,
			this.revealedCount = 0,
			this.score = 0;
			this.secondsPlayed = 0;

			this.$refs.grid.reset();

			this.start();
		},
	},

	mounted () {
		window.addEventListener('blur', () => {
			if (this.isPlaying) {
				this.pause()
			}
		});
		this.start();
	},

	// async created() {
	// 	// this.db = await getDb();
	// 	// this.highScores = await getHighScores(this.db);
	// 	// this.ready = true;
	// },
};
</script>

<style lang="scss">
.actions {
	--spacing-h: var(--spacing-micro);

	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
</style>
