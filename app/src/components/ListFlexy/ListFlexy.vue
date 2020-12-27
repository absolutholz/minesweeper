<template>
	<list-unstyled
		class="list-flexy"
		:ordered="ordered"
	><slot /></list-unstyled>
</template>

<script>
import ListUnstyled from './../ListUnstyled';

export default {
	name: 'ListFlexy',

	components: {
		ListUnstyled,
	},

	props: {
		ordered: {
			default: false,
			required: false,
			type: Boolean,
		},
	},
};
</script>

<style lang="scss">
.list-flexy {
	display: flex;
	flex-wrap: wrap;
	margin: calc(var(--list-spacing-v, var(--spacing-base)) * -1) calc(var(--list-spacing-h, var(--spacing-base)) * -1);

	> li {
		margin: var(--list-spacing-v, var(--spacing-base)) var(--list-spacing-h, var(--spacing-base));
	}
}
</style>
