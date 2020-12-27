import ListFlexy from '.';
import StorybookPlaceholder from './../StorybookPlacholder';

export default {
	title: 'Generic/Lists/Flexy',
	component: ListFlexy,
};

const Template = (args, { argTypes }) => ({
	components: { ListFlexy, StorybookPlaceholder },
	props: Object.keys(argTypes),
	template:  `
		<list-flexy v-bind="$props">
			<li><storybook-placeholder>List Item Placeholder</storybook-placeholder></li>
			<li><storybook-placeholder>List Item Placeholder</storybook-placeholder></li>
			<li><storybook-placeholder>List Item Placeholder</storybook-placeholder></li>
		</list-flexy>
	`,
});

export const Unordered = Template.bind({});
Unordered.args = {
};

export const Ordered = Template.bind({});
Ordered.args = {
	ordered: true,
};
