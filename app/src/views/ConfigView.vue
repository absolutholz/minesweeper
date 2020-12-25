<template>
	<form
		@submit.prevent="startGame"
	>
		<fieldset>
			<legend>Size</legend>

			<list-unstyled>
				<li v-for="(sizeIter, sizeIndex) in sizes" :key="sizeIndex">
					<label
						:for="`size-${ sizeIter.id }`"
					>
						<input
							v-model="size"
							:id="`size-${ sizeIter.id }`"
							name="size"
							type="radio"
							:value="sizeIter"
						/>
						<span>{{ sizeIter.name }}</span>

					</label>
				</li>
			</list-unstyled>
		</fieldset>

		<fieldset>
			<legend>Difficulty</legend>

			<list-unstyled>
				<li v-for="(difficultyIter, difficultyIndex) in difficulties" :key="difficultyIndex">
					<label
						:for="`difficulty-${ difficultyIter.id }`"
					>
						<input
							v-model="difficulty"
							:id="`difficulty-${ difficultyIter.id }`"
							name="difficulty"
							type="radio"
							:value="difficultyIter"
						/>
						<span>{{ difficultyIter.name }}</span>

					</label>
				</li>
			</list-unstyled>
		</fieldset>

		<button
			type="submit"
		>Play</button>
	</form>
</template>

<script>
import ListUnstyled from './../components/ListUnstyled';
import { SIZES, DIFFICULTIES } from './../components/game/Game';

export default {
	name: 'ConfigView',

	components: {
		ListUnstyled,
	},

	data () {
		return {
			difficulty: DIFFICULTIES[1],
			difficulties: DIFFICULTIES,
			size: SIZES[Math.floor(SIZES.length / 2)],
			sizes: SIZES,
		};
	},

	methods: {
		startGame () {
			this.$router.push({ name: 'Game', query: { size: this.size.id, difficulty: this.difficulty.id } });
		},
	},
};
</script>
