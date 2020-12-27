<template>
	<container>
		<page-hdln>
			<template #pre><abbr aria-label="Progressive Web App" title="Progressive Web App">PWA</abbr></template>
			Minesweeper
			<template #post><span aria-hidden="true">-</span> by absolutholz</template>
		</page-hdln>

		<form
			@submit.prevent="startGame"
		>
			<fieldset>
				<legend>Size</legend>

				<list-flexy class="option-list">
					<li v-for="(sizeIter, sizeIndex) in sizes" :key="sizeIndex">
						<label
							class="option-list__wrapper"
							:for="`size-${ sizeIter.id }`"
						>
							<input
								v-model="size"
								:id="`size-${ sizeIter.id }`"
								name="size"
								type="radio"
								:value="sizeIter"
							/>

							<size-graphic
								class="option-list__graphic"
								:size="sizeIter.id"
							/>
							<div class="option-list__label">
								<div>{{ sizeIter.name }}</div>
								<small>{{ sizeIter.description }}</small>

								<svg-check
									v-if="size === sizeIter"
									class="icon option-list__selected-icon"
								/>
							</div>

						</label>
					</li>
				</list-flexy>
			</fieldset>

			<fieldset>
				<legend>Difficulty</legend>

				<list-flexy class="option-list">
					<li v-for="(difficultyIter, difficultyIndex) in difficulties" :key="difficultyIndex">
						<label
							class="option-list__wrapper"
							:for="`difficulty-${ difficultyIter.id }`"
						>
							<input
								v-model="difficulty"
								:id="`difficulty-${ difficultyIter.id }`"
								name="difficulty"
								type="radio"
								:value="difficultyIter"
							/>
							<difficulty-graphic
								class="option-list__graphic"
								:difficulty="difficultyIter.id"
							>
							</difficulty-graphic>
								<div class="option-list__label">
								<div>{{ difficultyIter.name }}</div>

								<svg-check
									v-if="difficulty === difficultyIter"
									class="icon option-list__selected-icon"
								/>
							</div>

						</label>
					</li>
				</list-flexy>
			</fieldset>

			<btn
				class="btn--large"
				type="submit"
				variant="contained"
			>Play</btn>
		</form>

	</container>
</template>

<script>
import Btn from './../components/Btn';
import Container from './../components/Container';
import DifficultyGraphic from './../components/DifficultyGraphic';
import ListFlexy from './../components/ListFlexy';
import PageHdln from './../components/PageHdln';
import SizeGraphic from './../components/SizeGraphic';
import { SIZES, DIFFICULTIES } from './../components/game/Game';

import SvgCheck from '@mdi/svg/svg/check.svg';

export default {
	name: 'ConfigView',

	components: {
		Btn,
		Container,
		DifficultyGraphic,
		ListFlexy,
		PageHdln,
		SizeGraphic,

		SvgCheck,
	},

	data () {
		return {
			difficulty: DIFFICULTIES.find((difficulty) => difficulty.id === window.localStorage.difficulty) || DIFFICULTIES[1],
			difficulties: DIFFICULTIES,
			size: SIZES.find((size) => size.id === window.localStorage.size) || SIZES[Math.floor(SIZES.length / 2)],
			sizes: SIZES,
		};
	},

	methods: {
		startGame () {
			window.localStorage.size = this.size.id;
			window.localStorage.difficulty = this.difficulty.id;
			this.$router.push({ name: 'Game', query: { size: this.size.id, difficulty: this.difficulty.id } });
		},
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/layout/visually-hidden-mixins";

.option-list {
	> li {
		flex: 0 1 auto;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	&__graphic {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
	}

	&__label {
		margin-top: var(--spacing-mini);
		position: relative;
		text-align: center;
	}

	&__selected-icon {
		background: var(--on-primary);
		border: 2px solid;
		border-radius: 50%;
		box-shadow: 0 0 2px 0 var(--on-primary);
		box-sizing: content-box;
		color: var(--primary);
		font-size: 2rem;
		padding: 0.125rem;
		position: absolute;
		right: -0.25em;
		top: -1em;
	}

	input {
		@include visually-hidden();
	}
}
</style>
