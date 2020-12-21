<template>
	<div class="storybook-placeholder">
		<span class="storybook-placeholder__text">
			<slot>Placeholder</slot>
		</span>
	</div>
</template>

<script>
export default {
	name: 'StorybookPlaceholder',
};
</script>

<style lang="scss">
.storybook-placeholder {
	align-items: center;
	background: repeating-linear-gradient(45deg, Hsla(0, 100%, 50%, 0.5) 0, Hsla(0, 100%, 50%, 0.5) 15px, transparent 15px, transparent 30px);
	display: flex;
	justify-content: center;
	min-height: 100px;

	&__text {
		background: hsla(0, 100%, 100%, 0.95);
		border-radius: 4px;
		color: firebrick;
		padding: 0.5rem 1rem;
	}
}
</style>
