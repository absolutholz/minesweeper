<template>
	<component
		class="list-unstyled"
		:is="ordered ? 'ol' : 'ul'"
	><slot /></component>
</template>

<script>
export default {
	name: 'ListUnstyled',

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
.list-unstyled {
	list-style: none;
	padding-left: 0;
}
</style>
