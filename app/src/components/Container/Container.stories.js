import Container from '.';
import StorybookPlaceholder from './../StorybookPlacholder';

export default {
	title: 'Generic/Container',
	component: Container,
};

const Template = (args, { argTypes }) => ({
	components: { Container, StorybookPlaceholder },
	props: Object.keys(argTypes),
	template:  `
		<container v-bind="$props">
			<storybook-placeholder />
		</container>
	`,
});

export const Default = Template.bind({});
Default.args = {
};
