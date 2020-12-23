import PauseScreen from '.';

export default {
	title: 'Game/Pause Screen',
	component: PauseScreen,
};

const Template = (args, { argTypes }) => ({
	components: { PauseScreen },
	props: Object.keys(argTypes),
	template:  `
		<pause-screen v-bind="$props" />
	`,
});

export const Default = Template.bind({});
