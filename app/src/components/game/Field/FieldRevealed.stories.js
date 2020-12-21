import Field, { STATE_UNEXPLORED, STATE_REVEALED, STATE_FLAGGED, STATE_QUESTIONED, STATE_DETONATED } from '.';

export default {
	title: 'Game/Field/Revealed',
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

export const Zero = Template.bind({});
Zero.args = {
	state: STATE_REVEALED,
	nearMineCount: 0,
};

export const One = Template.bind({});
One.args = {
	state: STATE_REVEALED,
	nearMineCount: 1,
};

export const Two = Template.bind({});
Two.args = {
	state: STATE_REVEALED,
	nearMineCount: 2,
};

export const Three = Template.bind({});
Three.args = {
	state: STATE_REVEALED,
	nearMineCount: 3,
};

export const Four = Template.bind({});
Four.args = {
	state: STATE_REVEALED,
	nearMineCount: 4,
};

export const Five = Template.bind({});
Five.args = {
	state: STATE_REVEALED,
	nearMineCount: 5,
};

export const Six = Template.bind({});
Six.args = {
	state: STATE_REVEALED,
	nearMineCount: 6,
};

export const Seven = Template.bind({});
Seven.args = {
	state: STATE_REVEALED,
	nearMineCount: 7,
};

export const Eight = Template.bind({});
Eight.args = {
	state: STATE_REVEALED,
	nearMineCount: 8,
};
