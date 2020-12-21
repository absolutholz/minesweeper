<template>
	<button
		@contextmenu.prevent="mark"
		@click.prevent="reveal"
		class="field"
		:class="stateClasses"
		type="button"
	>
		<span
			v-if="state === states.STATE_REVEALED && nearMineCount"
		>{{ nearMineCount }}</span>
		<svg-flagged
			v-else-if="state === states.STATE_FLAGGED"
			class="icon"
		/>
		<svg-questioned
			v-else-if="state === states.STATE_QUESTIONED"
			class="icon"
		/>
		<svg-detonated
			v-else-if="state === states.STATE_DETONATED"
			class="icon"
		/>
		<span
			v-else
			class="icon field__placeholder"
		></span>
	</button>
</template>

<script>
import SvgDetonated from '@mdi/svg/svg/mine.svg';
import SvgFlagged from '@mdi/svg/svg/flag-triangle.svg';
import SvgQuestioned from '@mdi/svg/svg/help.svg';

export const STATE_UNEXPLORED = 'unexplored';
export const STATE_REVEALED = 'revealed';
export const STATE_FLAGGED = 'flagged';
export const STATE_QUESTIONED = 'questioned';
export const STATE_DETONATED = 'detonated';

const states = [ STATE_UNEXPLORED, STATE_REVEALED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED ];

export default {
	name: 'Field',

	components: {
		SvgDetonated,
		SvgFlagged,
		SvgQuestioned,
	},

	props: {
		state: {
			default: STATE_UNEXPLORED,
			required: false,
			type: String,
			validator: function(value) {
				return states.indexOf(value) !== -1;
			},
		},

		nearMineCount: {
			default: 0,
			required: false,
			type: Number,
		},
	},

	data () {
		return {
			states: { STATE_UNEXPLORED, STATE_REVEALED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED },
		};
	},

	computed: {
		stateClasses () {
			let stateClass = '';
			switch (this.state) {
				case STATE_REVEALED:
					stateClass = 'field--revealed';

					if (this.nearMineCount > 0) {
						stateClass += ` field--near-${ this.nearMineCount }`
					}

					break;
				case STATE_FLAGGED:
					stateClass = 'field--flagged';
					break;
				case STATE_QUESTIONED:
					stateClass = 'field--questioned';
					break;
				case STATE_DETONATED:
					stateClass = 'field--detonated';
					break;
			}

			return stateClass;
		},
	},

	methods: {
		mark (event) {
			console.log('mark', event);
		},

		reveal (event) {
			console.log('reveal', event);
		},
	},
};
</script>

<style lang="scss">
.field {
	align-content: center;
	background: #eee;
	border-radius: 3px;
	box-shadow:
		0px 3px 1px -2px rgba(0, 0, 0, 0.2),
		0px 2px 2px 0px rgba(0, 0, 0, 0.14),
		0px 1px 5px 0px rgba(0,0,0,.12);
	display: flex;
	font-size: 1.25rem;
	justify-content: center;
	padding-bottom: 100%;
	position: relative;
	width: 100%;

	> * {
		height: 1em;
		left: 50%;
		margin: -0.5em 0 0 -0.5em;
		position: absolute;
		top: 50%;
		width: 1em;
	}

	&__placeholder {

	}

	&--revealed {
		background: #fff;
		box-shadow: none;
		font-weight: bold;
		line-height: 1;
		text-align: center;
	}

	&--flagged {

	}

	&--questioned {

	}

	&--detonated {

	}

	&--near {
		&-1 {
			color: blue;
		}

		&-2{
			color: green;
		}

		&-3 {
			color: goldenrod;
		}

		&-4 {
			color: orange;
		}

		&-5 {
			color: red;
		}

		&-6 {
			color: purple;
		}

		&-7 {
			color: brown;
		}

		&-8 {
			color: black;
		}
	}
}
</style>
