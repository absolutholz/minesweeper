<template>
	<div class="btn-list">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'BtnList',
};
</script>

<style lang="scss">
.btn-list {
	margin: calc(var(--spacing-v, var(--spacing-mini)) #{"*"} -1) calc(var(--spacing-h, var(--spacing-base)) #{"*"} -1);

	> * {
		margin: var(--spacing-v, var(--spacing-mini)) var(--spacing-h, var(--spacing-base));
	}
}
</style>
