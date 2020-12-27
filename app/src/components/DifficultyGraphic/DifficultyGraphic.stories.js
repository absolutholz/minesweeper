import DifficultyGraphic from '.';

export default {
	title: 'Generic/Difficulty Graphic',
	component: DifficultyGraphic,
};

const Template = (args, { argTypes }) => ({
	components: { DifficultyGraphic },
	props: Object.keys(argTypes),
	template:  `
		<difficulty-graphic v-bind="$props" />
	`,
});

export const Simple = Template.bind({});
Simple.args = {
	difficulty: 'simple',
};

export const Medium = Template.bind({});
Medium.args = {
	difficulty: 'medium',
};

export const Hard = Template.bind({});
Hard.args = {
	difficulty: 'hard',
};

export const Expert = Template.bind({});
Expert.args = {
	difficulty: 'expert',
};
