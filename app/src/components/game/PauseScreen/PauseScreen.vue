<template>
	<section
		class="pause-screen"
	>
		<svg-pause class="icon pause-screen__icon" />
		<h3 class="pause-screen__hdln">Game is paused</h3>
		<div class="pause-screen__text">
			Click anywhere to resume
		</div>
	</section>
</template>

<script>
import SvgPause from '@mdi/svg/svg/pause.svg';

export default {
	name: 'PauseScreen',

	components: {
		SvgPause,
	},
};
</script>

<style lang="scss">
.pause-screen {
	align-items: center;
	bottom: 0;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 1;

	&::before {
		background: var(--surface);
		content: "";
		height: 100%;
		left: 0;
		opacity: 0.98;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: -1;
	}

	&__icon {
		font-size: 10rem;
	}

	&__hdln {
		font-size: var(--typo-size-macro);
		margin-bottom: 0;
		margin-top: 0;
	}

	&__text {
		margin-top: var(--spacing-base);
	}
}
</style>
