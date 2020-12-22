import TimeDisplay from '.';

export default {
	title: 'Generic/Time Display',
	component: TimeDisplay,
};

const Template = (args, { argTypes }) => ({
	components: { TimeDisplay },
	props: Object.keys(argTypes),
	template: `
		<time-display v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	seconds: 97,
};
