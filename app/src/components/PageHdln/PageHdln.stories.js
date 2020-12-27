import PageHdln from '.';

export default {
	title: 'Generic/Page Headline',
	component: PageHdln,
};

const Template = (args, { argTypes }) => ({
	components: { PageHdln },
	props: Object.keys(argTypes),
	template:  `
		<page-hdln v-bind="$props">{{ content }}</page-hdln>
	`,
});

export const Default = Template.bind({});
Default.args = {
	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
};
