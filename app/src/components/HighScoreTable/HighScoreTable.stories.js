import HighScoreTable from '.';
import { DIFFICULTIES } from './../game/Game';

export default {
	title: 'Generic/High Score Table',
	component: HighScoreTable,
	argTypes: {
		difficultyKey: {
			control: {
				type: 'select',
				options: DIFFICULTIES.map((difficulty) => difficulty.id),
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	components: { HighScoreTable },
	props: Object.keys(argTypes),
	template:  `
		<high-score-table v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	difficultyKey: DIFFICULTIES[0].id,
	highScores: [
		{
			seconds: 30,
			timestamp: new Date(),
		},
		{
			seconds: 46,
			timestamp: new Date(),
		},
		{
			seconds: 15,
			timestamp: new Date(),
		},
		{
			seconds: 67,
			timestamp: new Date(),
		},
		{
			seconds: 36,
			timestamp: new Date(),
		},
		{
			seconds: 48,
			timestamp: new Date(),
		},
		{
			seconds: 100,
			timestamp: new Date(),
		},
		{
			seconds: 39,
			timestamp: new Date(),
		},
		{
			seconds: 58,
			timestamp: new Date(),
		},
		{
			seconds: 16,
			timestamp: new Date(),
		},
	],
};
