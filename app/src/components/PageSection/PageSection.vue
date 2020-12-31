<template>
	<div class="page-section">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'PageSection',
};
</script>

<style lang="scss">
.page-section {
	margin-bottom: var(--spacing-macro);
	margin-top: var(--spacing-macro);
}
</style>
