import Btn from './../Btn';
import BtnList from '.';

export default {
	title: 'Generic/Btn List',
	component: BtnList,
};

const Template = (args, { argTypes }) => ({
	components: { Btn, BtnList },
	props: Object.keys(argTypes),
	template:  `
		<btn-list v-bind="$props">
			<btn variant="outlined">Button 1</btn>
			<btn variant="outlined">Button 2</btn>
			<btn>Button 3</btn>
			<btn>Button 4</btn>
		</btn-list>
	`,
});

export const Default = Template.bind({});
