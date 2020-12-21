import ListUnstyled from '.';
import StorybookPlaceholder from './../StorybookPlacholder';

export default {
	title: 'Generic/Lists/Unstyled',
	component: ListUnstyled,
};

const Template = (args, { argTypes }) => ({
	components: { ListUnstyled, StorybookPlaceholder },
	props: Object.keys(argTypes),
	template:  `
		<list-unstyled v-bind="$props">
			<li><storybook-placeholder>List Item Placeholder</storybook-placeholder></li>
			<li><storybook-placeholder>List Item Placeholder</storybook-placeholder></li>
			<li><storybook-placeholder>List Item Placeholder</storybook-placeholder></li>
		</list-unstyled>
	`,
});

export const Unordered = Template.bind({});
Unordered.args = {
};

export const Ordered = Template.bind({});
Ordered.args = {
	ordered: true,
};
