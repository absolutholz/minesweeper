import Game from '.';

export default {
	title: 'Game/Game',
	component: Game,
	argTypes: {
		fieldCount: {
			control: {
				type: 'range',
				min: 9,
				max: 144,
				step: 1,
			},
		},
		mineCount: {
			control: {
				type: 'range',
				min: 9,
				max: 144,
				step: 1,
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	components: { Game },
	props: Object.keys(argTypes),
	template:  `
		<game v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	fieldCount: 64,
	mineCount: 8,
};
