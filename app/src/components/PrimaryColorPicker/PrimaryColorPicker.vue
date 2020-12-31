<template>
	<list-flexy class="primary-color-picker">
		<li v-for="(COLOR, index) in COLORS" :key="index">
			<button
				@click="selectColor(COLOR)"
				class="primary-color-picker__swatch"
				:class="COLOR === activeColor ? 'primary-color-picker__swatch--active' : ''"
				:style="`--bg: ${ COLOR.surface }; --color: ${ COLOR.onSurface };`"
				type="button"
			>
				<span
					class="primary-color-picker__swatch-name"
				>{{ COLOR.name }}</span>
			</button>
		</li>
	</list-flexy>
</template>

<script>
import ListFlexy from './../ListFlexy';

const COLORS = [
	{
		name: 'Red',
		surface: '#c62828',
		onSurface: '#fff',
	},
	{
		name: 'Pink',
		surface: '#ad1457',
		onSurface: '#fff',
	},
	{
		name: 'Deep Purple',
		surface: '#4527a0',
		onSurface: '#fff',
	},
	{
		name: 'Blue',
		surface: '#1565c0',
		onSurface: '#fff',
	},
	{
		name: 'Green',
		surface: '#2e7d32',
		onSurface: '#fff',
	},
	{
		name: 'Yellow',
		surface: '#fdd835',
		onSurface: '#000',
	},
	{
		name: 'Orange',
		surface: '#ef6c00',
		onSurface: '#000',
	},
	{
		name: 'Brown',
		surface: '#6d4c41',
		onSurface: '#fff',
	},
];

export default {
	name: 'PrimarycolorPicker',

	components: {
		ListFlexy,
	},

	data () {
		return {
			surface: getComputedStyle(document.body).getPropertyValue('--primary').trim(),
			onSurface: getComputedStyle(document.body).getPropertyValue('--on-primary').trim(),
			COLORS,
		};
	},

	computed: {
		activeColor () {
			return COLORS.find((color) => color.surface === this.surface);
		},
	},

	methods: {
		selectColor (color) {
			this.surface = color.surface;
			this.onSurface = color.onSurface;

			document.body.style.setProperty('--primary', color.surface);
			document.body.style.setProperty('--on-primary', color.onSurface);

			window.localStorage.primarySurface = color.surface;
			window.localStorage.primaryOnSurface = color.onSurface;
		},
	},
};
</script>

<style lang="scss">
.primary-color-picker {
	> li {
		width: 100%;

		@media (min-width: 250px) {
			width: 50%;
		}

		@media (min-width: 500px) {
			width: 33.3%;
		}

		@media (min-width: 750px) {
			width: 25%;
		}
	}

	&__swatch {
		background: var(--bg);
		border-radius: 3px;
		color: var(--color);
		height: 100px;
		max-width: 100%;
		position: relative;
		transition: 250ms transform;
		width: 100%;
		will-change: transform;

		&--active {
			transform: scale(1.1);
		}
	}

	&__swatch-name {
		bottom: var(--spacing-base);
		font-size: var(--typo-size-mega);
		max-width: 100%;
		position: absolute;
		right: var(--spacing-base);
		text-align: right;
	}
}
</style>
