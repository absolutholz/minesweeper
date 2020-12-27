import SizeGraphic from '.';

export default {
	title: 'Generic/Size Graphic',
	component: SizeGraphic,
};

const Template = (args, { argTypes }) => ({
	components: { SizeGraphic },
	props: Object.keys(argTypes),
	template:  `
		<size-graphic v-bind="$props" />
	`,
});

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
	size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
	size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
	size: 'md',
};

export const Large = Template.bind({});
Large.args = {
	size: 'lg',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
	size: 'xl',
};
