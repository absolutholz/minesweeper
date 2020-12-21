import Grid from '.';
import FieldStories from '../Field/Field.stories';

const fields = [];
for (let i = 0; i < 25; i+=1) {
	fields.push({});
}

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
	fieldCount: 64,
	mineCount: 8,
};
