import Board from '.';
import StorybookPlaceholder from './../../StorybookPlacholder';

export default {
	title: 'Game/Board',
	component: Board,
};

const Template = (args, { argTypes }) => ({
	components: { Board, StorybookPlaceholder },
	props: Object.keys(argTypes),
	template:  `
		<board v-bind="$props">
			<storybook-placeholder style="height: 100%; width: 100%;">Game Placeholder</storybook-placeholder>
			<template #status><storybook-placeholder style="height: 100%; width: 100%;">Status Placeholder</storybook-placeholder></template>
			<template #actions><storybook-placeholder>Actions Placeholder</storybook-placeholder></template>
		</board>
	`,
});

export const Default = Template.bind({});
Default.args = {};
