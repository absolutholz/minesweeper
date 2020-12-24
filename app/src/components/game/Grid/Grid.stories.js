import Grid from '.';

export default {
	title: 'Game/Grid',
	component: Grid,
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
	components: { Grid },
	props: Object.keys(argTypes),
	template:  `
		<grid v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	fieldCount: 81,
	mineCount: 10,
	disable: false,
};
