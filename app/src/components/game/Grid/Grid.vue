<template>
	<list-unstyled
		class="grid"
		:ordered="true"
		:style="`--columns: ${ columns };`"
	>
		<li v-for="(field, index) in fields" :key="index">
			<field
				:state="field.mine ? 'detonated' : 'revealed'"
				:nearMineCount="field.nearMineCount"
			/>
		</li>
	</list-unstyled>
</template>

<script>
import Field from './../Field';
import ListUnstyled from './../../ListUnstyled';

import shuffle from './../../../js/array-shuffle';
import { STATE_UNEXPLORED } from '../Field/Field.vue';

export default {
	name: 'Grid',

	components: {
		Field,
		ListUnstyled,
	},

	props: {
		fieldCount: {
			required: true,
			type: Number,
		},

		mineCount: {
			required: true,
			type: Number,
		},
	},

	data () {
		return {
			fieldsByRow: [],
			fieldsByCol: [],
		};
	},

	computed: {
		fields () {
			let fields = [];
			for (let i = 0; i < this.fieldCount; i += 1) {
				fields.push({
					state: STATE_UNEXPLORED,
					mine: i < this.mineCount,
					nearMineCount: 0,
				});
			}

			fields = shuffle(fields);

			fields.forEach((field, index) => {
				field.col = index % this.columns;
				field.row = Math.floor(index / this.columns);
				field.id = `${ field.col }x${ field.row }`;

				if (!this.fieldsByRow[field.row]) {
					this.fieldsByRow[field.row] = [];
				}
				this.fieldsByRow[field.row].push(field);

				if (!this.fieldsByCol[field.col]) {
					this.fieldsByCol[field.col] = [];
				}
				this.fieldsByCol[field.col].push(field);
			});

			fields.forEach((field, index) => {
				const prevRow = field.row - 1;
				const nextRow = field.row + 1;
				const prevCol = field.col - 1;
				const nextCol = field.col + 1;

				const isFirstRow = prevRow < 0;
				const isLastRow = nextRow > this.fieldsByRow.length- 1;
				const isFirstCol = prevCol < 0;
				const isLastCol = nextCol > this.fieldsByCol.length- 1;

				if (field.mine) {
					// above & left
					if (!isFirstCol && !isFirstRow) {
						this.fieldsByCol[field.col - 1][field.row - 1].nearMineCount += 1;
					}
					// above & center
					if (!isFirstRow) {
						this.fieldsByCol[field.col][field.row - 1].nearMineCount += 1;
					}
					// above & right
					if (!isLastCol && !isFirstRow) {
						this.fieldsByCol[field.col + 1][field.row - 1].nearMineCount += 1;
					}

					// left
					if (!isFirstCol) {
						this.fieldsByCol[field.col - 1][field.row].nearMineCount += 1;
					}
					// right
					if (!isLastCol) {
						this.fieldsByCol[field.col + 1][field.row].nearMineCount += 1;
					}

					// below & left
					if (!isFirstCol && !isLastRow) {
						this.fieldsByCol[field.col - 1][field.row + 1].nearMineCount += 1;
					}
					// below & center
					if (!isLastRow) {
						this.fieldsByCol[field.col][field.row + 1].nearMineCount += 1;
					}
					// below & right
					if (!isLastCol && !isLastRow) {
						this.fieldsByCol[field.col + 1][field.row + 1].nearMineCount += 1;
					}
				}
			});

			return fields;
		},

		columns () {
			return Math.ceil(Math.sqrt(this.fieldCount));
		},

		rows () {
			return Math.ceil(this.fieldCount / this.columns);
		},
	},
};
</script>

<style lang="scss">
.grid {
	display: grid;
	grid-auto-rows: 50px;
	grid-gap: 0.125rem;
	grid-template-columns: repeat(
		var(--columns),
		50px
	);
}
</style>
