import Btn, { VARIANTS } from '.';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Generic/Btn',
	component: Btn,
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: VARIANTS,
			},
		},
	},
};

const actionsData = {
  onClick: action('click'),
};

const Template = (args, { argTypes }) => ({
	components: { Btn },
	props: Object.keys(argTypes),
	methods: actionsData,
	template:  `
		<btn v-bind="$props" @click="onClick">Button</btn>
	`,
});

export const Default = Template.bind({});
