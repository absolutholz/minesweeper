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
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	justify-content: center;
	width: 100%;
	padding: 0.5rem 0.25rem;

	@media (orientation: landscape) {
		flex-direction: column;
		align-items: flex-start;
	}

	&__time {
		margin-right: var(--spacing-base);

		@media (orientation: landscape) {
			margin-bottom: var(--spacing-base);
			margin-right: 0;
		}
	}

	&__mines {
	}
}
</style>
