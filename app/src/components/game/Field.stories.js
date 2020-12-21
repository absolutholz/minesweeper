import Field, { STATE_UNDISCOVERED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED } from '.';

export default {
	title: 'Game/Field',
	component: Field,
	argTypes: {
		state: {
			control: {
				type: 'select',
				options: [ STATE_UNDISCOVERED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED ],
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	components: { Field },
	props: Object.keys(argTypes),
	template:  `
		<field v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	state: STATE_UNDISCOVERED,
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
