import RichText from '.';

export default {
	title: 'Generic/Rich Text',
	component: RichText,
};

const Template = (args, { argTypes }) => ({
	components: { RichText },
	props: Object.keys(argTypes),
	template:  `
		<rich-text v-bind="$props">{{ $props.text }}</rich-text>
	`,
});

export const Default = Template.bind({});
Default.args = {
	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};
