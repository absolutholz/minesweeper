import Field, { STATE_UNEXPLORED, STATE_REVEALED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED } from '.';

export default {
	title: 'Game/Field',
	component: Field,
	argTypes: {
		state: {
			control: {
				type: 'select',
				options: [ STATE_UNEXPLORED, STATE_REVEALED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED ],
			},
		},
		nearMineCount: {
			control: {
				type: 'range',
				min: 0,
				max: 8,
				step: 1,
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	components: { Field },
	props: Object.keys(argTypes),
	template:  `
		<div style="width: 50px;">
			<field v-bind="$props" />
		</div>
	`,
});

export const Default = Template.bind({});
Default.args = {
	state: STATE_UNEXPLORED,
};

export const Flagged = Template.bind({});
Flagged.args = {
	state: STATE_FLAGGED,
};

export const Questioned = Template.bind({});
Questioned.args = {
	state: STATE_QUESTIONED,
};

export const Detonated = Template.bind({});
Detonated.args = {
	state: STATE_DETONATED,
};

