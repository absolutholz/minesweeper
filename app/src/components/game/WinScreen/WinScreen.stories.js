import WinScreen from '.';

export default {
	title: 'Game/Win Screen',
	component: WinScreen,
};

const Template = (args, { argTypes }) => ({
	components: { WinScreen },
	props: Object.keys(argTypes),
	template:  `
		<win-screen v-bind="$props" />
	`,
});

export const Default = Template.bind({});
