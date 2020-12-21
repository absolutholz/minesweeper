<template>
	<button
		class="field"
		:class="stateClass"
		type="button"
	>
		<svg-flagged v-if="state === states.STATE_FLAGGED" class="icon" />
		<svg-questioned v-else-if="state === states.STATE_QUESTIONED" class="icon" />
		<svg-detonated v-else-if="state === states.STATE_DETONATED" class="icon" />
	</button>
</template>

<script>
import SvgDetonated from '@mdi/svg/svg/mine.svg';
import SvgFlagged from '@mdi/svg/svg/flag-triangle.svg';
import SvgQuestioned from '@mdi/svg/svg/help.svg';

export const STATE_UNDISCOVERED = 'undiscovered';
export const STATE_FLAGGED = 'flagged';
export const STATE_QUESTIONED = 'questioned';
export const STATE_DETONATED = 'detonated';

const states = [ STATE_UNDISCOVERED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED ];

export default {
	name: 'Field',

	components: {
		SvgDetonated,
		SvgFlagged,
		SvgQuestioned,
	},

	props: {
		state: {
			default: STATE_UNDISCOVERED,
			required: false,
			type: String,
			validator: function(value) {
				return states.indexOf(value) !== -1;
			},
		},
	},

	data () {
		return {
			states: { STATE_UNDISCOVERED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED },
		};
	},

	computed: {
		stateClass () {
			switch (this.state) {
				case STATE_FLAGGED:
					return 'field--flagged';
				case STATE_QUESTIONED:
					return 'field--questioned';
				case STATE_DETONATED:
					return 'field--detonated';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.field {
	align-content: center;
	border-radius: 3px;
	box-shadow:
		0px 3px 1px -2px rgba(0, 0, 0, 0.2),
		0px 2px 2px 0px rgba(0, 0, 0, 0.14),
		0px 1px 5px 0px rgba(0,0,0,.12);
	display: flex;
	font-size: 1.25rem;
	justify-content: center;
	padding: 0.5em;

	&--flagged {

	}

	&--questioned {

	}

	&--detonated {

	}
}
</style>
