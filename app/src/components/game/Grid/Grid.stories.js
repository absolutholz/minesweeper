import Grid from '.';
import FieldStories from '../Field/Field.stories';

const fields = [];
for (let i = 0; i < 25; i+=1) {
	fields.push({});
}

export default {
	title: 'Game/Grid',
	component: Grid,
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
	fields,
};
