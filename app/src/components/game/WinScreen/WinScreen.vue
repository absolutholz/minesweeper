<template>
	<div class="win-screen">
		<h2 class="win-screen__hdln">Congratulations!</h2>
		<div>
			<btn-list>
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
		font-weight: bold;
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
}
</style>
