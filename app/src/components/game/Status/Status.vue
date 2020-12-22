<template>
	<div class="status">
		<div class="status__time"><time-display :seconds="secondsPlayed" /></div>
		<div class="status__rounds"><svg-mine class="icon" /> {{ mineCount }}</div>
	</div>
</template>

<script>
import TimeDisplay from './../../TimeDisplay';

import SvgMine from '@mdi/svg/svg/mine.svg';

export default {
	name: 'Status',

	components: {
		TimeDisplay,

		SvgMine,
	},

	props: {
		secondsPlayed: {
			default: 0,
			required: false,
			type: Number,
		},

		mineCount: {
			required: true,
			type: Number,
		},
	},
};
</script>

<style lang="scss">
.status {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;

	&__time {
		margin-right: var(--spacing-base);
	}

	&__mines {
	}
}
</style>
