<template>
	<span
		class="field"
		:class="stateClasses"
	>
		<span
			v-if="isRevealed"
		>{{ nearMineCount }}</span>
		<svg-flagged
			v-else-if="isFlagged"
			class="icon"
		/>
		<svg-questioned
			v-else-if="isQuestioned"
			class="icon"
		/>
		<svg-detonated
			v-else-if="isDetonated"
			class="icon"
		/>
		<span
			v-else
			class="icon field__placeholder"
		></span>
	</span>
</template>

<script>
import SvgDetonated from '@mdi/svg/svg/mine.svg';
// import SvgFlagged from '@mdi/svg/svg/flag-triangle.svg';
import SvgFlagged from './../../svgs/flag';
import SvgQuestioned from '@mdi/svg/svg/help.svg';

export const STATE_UNEXPLORED = 'unexplored';
export const STATE_REVEALED = 'revealed';
export const STATE_FLAGGED = 'flagged';
export const STATE_QUESTIONED = 'questioned';
export const STATE_DETONATED = 'detonated';

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
				return [ STATE_UNEXPLORED, STATE_REVEALED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED ].indexOf(value) !== -1;
			},
		},

		nearMineCount: {
			default: 0,
			required: false,
			type: Number,
		},
	},

	computed: {
		isRevealed () {
			return this.state === STATE_REVEALED && this.nearMineCount ;
		},

		isFlagged () {
			return this.state === STATE_FLAGGED;
		},

		isQuestioned () {
			return this.state === STATE_QUESTIONED;
		},

		isDetonated () {
			return this.state === STATE_DETONATED;
		},

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
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

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
	transition: background 200ms;
	width: 100%;
	will-change: background;

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
		font-weight: $typography-weight-bold;
		line-height: 1;
		text-align: center;
	}

	&--flagged {

	}

	&--questioned {

	}

	&--detonated {
		background: radial-gradient(#FDD835 25%, #FF6F00, #B71C1C);
		box-shadow:
			inset 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
			inset 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
			inset 0px 1px 5px 0px rgba(0,0,0,.12);
	}

	// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
	&--near {
		&-1 {
			color: #0277BD;
		}

		&-2{
			color: #689F38;
		}

		&-3 {
			color: #C62828;
		}

		&-4 {
			color: #0D47A1;
		}

		&-5 {
			color: #C62828;
		}

		&-6 {
			color: #2E7D32;
		}

		&-7 {
			color: #512DA8;
		}

		&-8 {
			color: #FF6F00;
		}
	}
}
</style>
