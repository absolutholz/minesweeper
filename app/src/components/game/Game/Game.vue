<template>
	<board>
		<grid
			@update="updateMineCount"
			:fieldCount="fieldCount"
			:mineCount="mineCount"
		/>

		<pause-screen v-if="isPaused" />

		<template #status>
			<status
				:mineCount="minesLeft"
				:secondsPlayed="secondsPlayed"
			/>
		</template>

		<template #actions>
			<button
				@click="isPaused ? resume() : pause()"
				:disabled="isStopped"
			>
				<svg-pause class="icon" />
			</button>
			<span>
				<svg-home class="icon" />
			</span>
		</template>
	</board>
</template>

<script>
import Board from './../Board';
import Grid from './../Grid';
import PauseScreen from './../PauseScreen';
import Status from './../Status';

import SvgHome from '@mdi/svg/svg/home.svg';
import SvgPause from '@mdi/svg/svg/pause.svg';

import Timer from './../../../js/Timer';

export const STATE_GAME_NOT_STARTED = 'game_not_started';
export const STATE_GAME_PLAYING = 'game_playing';
export const STATE_GAME_PAUSED = 'game_paused';
export const STATE_GAME_OVER = 'game_over';

export default {
	name: 'Game',

	components: {
		Board,
		Grid,
		PauseScreen,
		Status,

		SvgHome,
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
	},

	methods: {
		updateMineCount (data) {
			this.flagCount = data.flags;
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

		end () {
			this.timer.stop();
			this.state = STATE_GAME_OVER;
		},
	},

	mounted () {
		this.start();
	},
};
</script>
