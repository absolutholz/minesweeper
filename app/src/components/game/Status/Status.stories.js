import Status from '.';

export default {
	title: 'Game/Status',
	component: Status,
};

const Template = (args, { argTypes }) => ({
	components: { Status },
	props: Object.keys(argTypes),
	template:  `
		<status v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	secondsPlayed: 97,
	mineCount: 10,
};
