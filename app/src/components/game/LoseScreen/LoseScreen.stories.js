import LoseScreen from '.';

export default {
	title: 'Game/Lose Screen',
	component: LoseScreen,
};

const Template = (args, { argTypes }) => ({
	components: { LoseScreen },
	props: Object.keys(argTypes),
	template:  `
		<lose-screen v-bind="$props" />
	`,
});

export const Default = Template.bind({});
