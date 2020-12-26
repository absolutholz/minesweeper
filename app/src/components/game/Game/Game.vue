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

export const STATE_GAME_NOT_STARTED = 'game_not_started';
export const STATE_GAME_PLAYING = 'game_playing';
export const STATE_GAME_PAUSED = 'game_paused';
export const STATE_GAME_WON = 'game_won';
export const STATE_GAME_LOST = 'game_lost';

export const SIZES = [
	{
		id: 'xs',
		name: 'Extra Small - 25 fields',
		fieldCount: 25,
	},
	{
		id: 'sm',
		name: 'Small - 49 fields',
		fieldCount: 49,
	},
	{
		id: 'md',
		name: 'Medium - 81 fields',
		fieldCount: 81,
	},
	{
		id: 'lg',
		name: 'Large - 121 fields',
		fieldCount: 121,
	},
	{
		id: 'xl',
		name: 'Extra Large - 144 fields',
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
		id: 'expert',
		name: 'Expert',
		mineRatio: 0.2,
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
			revealedCount: 0,
			flagCount: 0,
			secondsPlayed: 0,
			timer: null,
			state: STATE_GAME_NOT_STARTED,
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

		winGame () {
			this.timer.stop();
			this.state = STATE_GAME_WON;
		},

		start () {
			if (!this.timer) {
				this.timer = Timer(1000);
				this.timer.addObserver({
					update: () => {
						this.secondsPlayed += 1;
					},
				});
				this.timer.start();
			}
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

			this.secondsPlayed = 0;
			this.revealedCount = 0,
			this.flagCount = 0,

			this.$refs.grid.reset();

			this.start();
		},
	},

	mounted () {
		this.start();
	},
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
