import PrimaryColorPicker from '.';

export default {
	title: 'PrimaryColorPicker',
	component: PrimaryColorPicker,
};

const Template = (args, { argTypes }) => ({
	components: { PrimaryColorPicker },
	props: Object.keys(argTypes),
	template:  `
		<primary-color-picker v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {};
