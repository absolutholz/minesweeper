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
				class="grid__field-btn"
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
	},

	data () {
		return {
			fields: [],
			fieldsByCol: [],
		};
	},

	computed: {
		columns () {
			return Math.ceil(Math.sqrt(this.fieldCount));
		},

		rows () {
			return Math.ceil(this.fieldCount / this.columns);
		},
	},

	methods: {
		mark (field) {
			switch (field.state) {
				case STATE_UNEXPLORED:
					field.state = STATE_FLAGGED;
					break;
				case STATE_FLAGGED:
					field.state = STATE_QUESTIONED;
					break;
				default:
					field.state = STATE_UNEXPLORED;
			}
		},

		reveal (field) {
			if (field.state === STATE_UNEXPLORED) {
				if (!field.mine) {
					field.state = STATE_REVEALED;

					if (field.nearMineCount === 0) {
						setTimeout(() => {
							field.neighbors.forEach((neighbor) => {
								// if (neighbor.state === STATE_UNEXPLORED) {
									this.reveal(neighbor);
								// }
							});
						}, 25);
					}

				} else {
					field.state = STATE_DETONATED;
				}
			}
		},

		createFields () {
			let fields = [];
			for (let i = 0; i < this.fieldCount; i += 1) {
				fields.push({
					state: STATE_UNEXPLORED,
					mine: i < this.mineCount,
					nearMineCount: 0,
					neighbors: [],
				});
			}

			fields = shuffle(fields);

			fields.forEach((field, index) => {
				field.col = index % this.columns;
				field.row = Math.floor(index / this.columns);
				field.id = `${ field.col }x${ field.row }`;

				if (!this.fieldsByCol[field.col]) {
					this.fieldsByCol[field.col] = [];
				}
				this.fieldsByCol[field.col].push(field);
			});

			fields.forEach((field) => {
				const prevRow = field.row - 1;
				const nextRow = field.row + 1;
				const prevCol = field.col - 1;
				const nextCol = field.col + 1;

				const isFirstRow = prevRow < 0;
				const isLastRow = nextRow > this.rows - 1;
				const isFirstCol = prevCol < 0;
				const isLastCol = nextCol > this.columns - 1;

				// above & left
				if (!isFirstCol && !isFirstRow) {
					const neighbor = this.fieldsByCol[field.col - 1][field.row - 1];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}
				// above & center
				if (!isFirstRow) {
					const neighbor = this.fieldsByCol[field.col][field.row - 1];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}
				// above & right
				if (!isLastCol && !isFirstRow) {
					const neighbor = this.fieldsByCol[field.col + 1][field.row - 1];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}

				// left
				if (!isFirstCol) {
					const neighbor = this.fieldsByCol[field.col - 1][field.row];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}
				// right
				if (!isLastCol) {
					const neighbor = this.fieldsByCol[field.col + 1][field.row];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}

				// below & left
				if (!isFirstCol && !isLastRow) {
					const neighbor = this.fieldsByCol[field.col - 1][field.row + 1];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}
				// below & center
				if (!isLastRow) {
					const neighbor = this.fieldsByCol[field.col][field.row + 1];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}
				// below & right
				if (!isLastCol && !isLastRow) {
					const neighbor = this.fieldsByCol[field.col + 1][field.row + 1];
					if (neighbor.mine) {
						field.nearMineCount += 1;
					}
					field.neighbors.push(neighbor);
				}
			});

			this.fields = fields;
		},
	},

	mounted () {
		this.createFields();
	},
};
</script>

<style lang="scss">
.grid {
	display: grid;
	grid-auto-rows: 50px;
	grid-gap: 0.5rem;
	grid-template-columns: repeat(
		var(--columns),
		50px
	);

	&__field-btn {
		height: 100%;
		width: 100%;
	}
}
</style>
