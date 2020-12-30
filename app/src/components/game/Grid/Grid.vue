<template>
	<list-unstyled
		class="grid"
		:ordered="true"
		:style="`--columns: ${ columns };`"
	>
		<li v-for="(field, index) in fields" :key="index">
			<button
				@click.prevent="reveal(field)"
				@contextmenu.prevent="mark(field)"
				@dblclick.prevent="handleDoubleClick(field)"
				class="grid__field-btn"
				:disabled="disable"
			>
				<field
					:state="field.state"
					:nearMineCount="field.nearMineCount"
				/>
			</button>
		</li>
	</list-unstyled>
</template>

<script>
import Field from './../Field';
import ListUnstyled from './../../ListUnstyled';

import shuffle from './../../../js/array-shuffle';
import { STATE_UNEXPLORED, STATE_REVEALED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED } from '../Field/Field.vue';

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

		disable: {
			required: true,
			type: Boolean,
		},
	},

	data () {
		return {
			fields: [],
			flags: 0,
			columns: 0,
		};
	},

	methods: {
		mark (field) {
			if (field.state !== STATE_REVEALED) {
				switch (field.state) {
					case STATE_UNEXPLORED:
						field.state = STATE_FLAGGED;
						this.flags += 1;
						this.$emit('update', { flags: this.flags });
						break;
					case STATE_FLAGGED:
						field.state = STATE_QUESTIONED;
						this.flags -= 1;
						this.$emit('update', { flags: this.flags });
						break;
					default:
						field.state = STATE_UNEXPLORED;
				}
			}
		},

		reveal (field) {
			// console.log('single click', event);
			if (field.state === STATE_UNEXPLORED) {
				if (!field.mine) {
					field.state = STATE_REVEALED;

					if (field.nearMineCount === 0) {
						setTimeout(() => {
							field.neighbors.forEach((neighbor) => this.reveal(neighbor));
						}, 25);
					}

					this.$emit('revealed');

				} else {
					field.state = STATE_DETONATED;
					this.$emit('detonated');
				}
			}
		},

		handleDoubleClick (field) {
			// console.log('double click', event, field);
			if (field.state === STATE_REVEALED && field.nearMineCount > 0) {
				// console.log(field.nearMineCount, field.neighbors);
				const flaggedFields = field.neighbors.filter((neighbor) => neighbor.state === STATE_FLAGGED);
				if (flaggedFields.length === field.nearMineCount) {
					field.neighbors.forEach((neighbor) => this.reveal(neighbor));
				}
			}
		},

		reset () {
			this.flags = 0;
			this.createFields();
		},

		createFields () {
			// console.log('fields');
			let fields = [];

			for (let i = 0; i < this.fieldCount; i += 1) {
				fields.push({
					state: STATE_UNEXPLORED,
					mine: i < this.mineCount,
					nearMineCount: 0,
					neighbors: [],
				});
			}

			if (fields.length) {
				shuffle(fields);

				const { columns, rows, fieldsByCol } = this.organizeFields(fields);

				this.columns = columns;

				this.annotateFields(fields, columns, rows, fieldsByCol);
			}

			this.fields = fields;
		},

		organizeFields (fields) {
			// console.log('organizing', { fields });
			const fieldsByCol = [];

			const columns = Math.ceil(Math.sqrt(fields.length));
			const rows = Math.ceil(fields.length / columns);

			fields.forEach((field, index) => {
				field.col = index % columns;
				field.row = Math.floor(index / columns);
				field.id = `${ field.col }x${ field.row }`;

				if (!fieldsByCol[field.col]) {
					fieldsByCol[field.col] = [];
				}
				fieldsByCol[field.col].push(field);
			});

			return { columns, rows, fieldsByCol };
		},

		annotateFields (fields, columns, rows, fieldsByCol) {
			// console.log('annotating', { fields, columns, rows, fieldsByCol });
			fields.forEach((field) => {
				const prevRow = field.row - 1;
				const nextRow = field.row + 1;
				const prevCol = field.col - 1;
				const nextCol = field.col + 1;

				const isFirstRow = prevRow < 0;
				const isLastRow = nextRow > rows - 1;
				const isFirstCol = prevCol < 0;
				const isLastCol = nextCol > columns - 1;

				function addNeighbor (neighbor) {
					if (neighbor) {
						if (neighbor.mine) {
							field.nearMineCount += 1;
						}
						field.neighbors.push(neighbor);
					}
				}

				// above & left
				if (!isFirstCol && !isFirstRow) {
					addNeighbor(fieldsByCol[field.col - 1][field.row - 1]);
				}
				// above & center
				if (!isFirstRow) {
					addNeighbor(fieldsByCol[field.col][field.row - 1]);
				}
				// above & right
				if (!isLastCol && !isFirstRow) {
					addNeighbor(fieldsByCol[field.col + 1][field.row - 1]);
				}

				// left
				if (!isFirstCol) {
					addNeighbor(fieldsByCol[field.col - 1][field.row]);
				}
				// right
				if (!isLastCol) {
					addNeighbor(fieldsByCol[field.col + 1][field.row]);
				}

				// below & left
				if (!isFirstCol && !isLastRow) {
					addNeighbor(fieldsByCol[field.col - 1][field.row + 1]);
				}
				// below & center
				if (!isLastRow) {
					addNeighbor(fieldsByCol[field.col][field.row + 1]);
				}
				// below & right
				if (!isLastCol && !isLastRow) {
					addNeighbor(fieldsByCol[field.col + 1][field.row + 1]);
				}
			});
		},
	},

	watch: {
		fieldCount () {
			this.createFields();
		},

		mineCount () {
			this.createFields();
		},
	},

	mounted () {
		this.createFields();
	},
};
</script>

<style lang="scss">
.grid {
	--gap: 0.5rem;
	--size: calc(50px + var(--gap));

	display: grid;
	grid-auto-rows: var(--size);
	// grid-gap: var(--gap);
	grid-template-columns: repeat(
		var(--columns),
		var(--size)
	);
	// grid-template-columns: repeat(
	// 	var(--columns),
	// 	Min(50px, #{"(100% / var(--columns)) - var(--gap)"})
	// );
	margin: 0;
	max-height: 100%;
	max-width: 100%;
	overflow: auto;

	&__field-btn {
		height: 100%;
		width: 100%;
	}

	> li {
		display: flex;
		padding: calc(var(--gap) / 2);
	}
}
</style>
