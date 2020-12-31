import PageSection from '.';
import StorybookPlaceholder from './../StorybookPlacholder';

export default {
	title: 'Generic/Page Sections/Page Section',
	component: PageSection,
};

const Template = (args, { argTypes }) => ({
	components: { PageSection, StorybookPlaceholder },
	props: Object.keys(argTypes),
	template:  `
		<page-section v-bind="$props">
			<storybook-placeholder>Page Section Placeholder</storybook-placeholder>
		</page-section>
	`,
});

export const Default = Template.bind({});
Default.args = {};
