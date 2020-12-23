<template>
	<board>
		<grid
			@update="updateMineCount"
			:fieldCount="fieldCount"
			:mineCount="mineCount"
		/>
		<template #status>
			<status
				:mineCount="minesLeft"
				:secondsPlayed="secondsPlayed"
			/>
		</template>
		<template #actions>asdf</template>
	</board>
</template>

<script>
import Board from './../Board';
import Grid from './../Grid';
import Status from './../Status';

import Timer from './../../../js/Timer';

export default {
	name: 'Game',

	components: {
		Board,
		Grid,
		Status,
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

		};
	},

	computed: {
		minesLeft () {
			return this.mineCount - this.flagCount;
		},
	},

	methods: {
		updateMineCount (data) {
			this.flagCount = data.flags;
		},
	},

	mounted () {
		if (!this.timer) {
			this.timer = Timer(1000);
			this.timer.addObserver({
				update: () => {
					this.secondsPlayed += 1;
				},
			});
			this.timer.start();
		}
	},
};
</script>
