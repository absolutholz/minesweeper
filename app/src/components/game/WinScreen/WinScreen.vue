<template>
	<div class="win-screen">
		<h2 class="win-screen__hdln">Congratulations!</h2>

		<div
			v-if="!!(this.$slots.default || [])[0]"
			class="win-screen__rich-text"
		>
			<slot />
		</div>

		<btn-list class="win-screen__btn-list">
			<btn
				@click="$emit('restart')"
				variant="contained"
			>
				<svg-restart class="icon" />
				Play Again
			</btn>
			<btn
				:to="{ name: 'Config' }"
				variant="contained"
			>
				<svg-home class="icon" />
				New Game
			</btn>
		</btn-list>
	</div>
</template>

<script>
import Btn from './../../Btn';
import BtnList from './../../BtnList';

import SvgHome from '@mdi/svg/svg/home.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';

export default {
	name: 'WinScreen',

	components: {
		Btn,
		BtnList,

		SvgHome,
		SvgRestart,
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

.win-screen {
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

	padding: var(--spacing-base);
	text-align: center;

	&__hdln {
		color: white;
		font-size: 2rem;
		font-weight: $typography-weight-medium;
		margin: 0;
		text-shadow:
			0px 0px 20px black,
			0px 0px 10px var(--primary),
			0px 0px 5px black;

		@media (min-width: 400px) {
			font-size: 3rem;
		}

		@media (min-width: 600px) {
			font-size: 4rem;
		}
	}

	&__btn-list {
		margin-top: var(--spacing-base);
	}

	&__rich-text {
		background: white;
		border-radius: 3px;
		padding: var(--spacing-base);
		margin-top: var(--spacing-base);
	}
}
</style>
