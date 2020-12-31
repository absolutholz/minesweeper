<template>
	<main>
		<page-section>
			<container>
				<page-hdln>Settings</page-hdln>
			</container>
		</page-section>

		<page-section>
			<container>
				<h2>Select a color theme</h2>
				<primary-color-picker />
			</container>
		</page-section>

		<container>
			<btn-list>
				<btn
					:to="{ name: 'Config' }"
					variant="contained"
				>
					<svg-home class="icon" />
					Home
				</btn>
			</btn-list>
		</container>
	</main>
</template>

<script>
import Btn from './../components/Btn';
import BtnList from './../components/BtnList';
import Container from './../components/Container';
import PageHdln from './../components/PageHdln';
import PageSection from './../components/PageSection';
import PrimaryColorPicker from './../components/PrimaryColorPicker';

import SvgHome from '@mdi/svg/svg/home.svg';

export default {
	name: 'SettingsView',

	components: {
		Btn,
		BtnList,
		Container,
		PageHdln,
		PageSection,
		PrimaryColorPicker,

		SvgHome,
	},
};
</script>
