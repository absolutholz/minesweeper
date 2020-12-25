import Vue from 'vue';
import VueRouter from 'vue-router';

import GameView from '@/views/GameView.vue';
import ConfigView from '@/views/ConfigView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Config',
		component: ConfigView,
	},
	{
		path: '/game',
		name: 'Game',
		component: GameView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
