<template>
	<div class="l-container"><slot /></div>
</template>

<script>
export default {
	name: 'Container',
};
</script>

<style lang="scss">
.l-container {
	max-width: var(--max-width, 800px);
	margin-left: auto;
	margin-right: auto;
	padding-left: var(--spacing-base);
	padding-right: var(--spacing-base);
}
</style>
