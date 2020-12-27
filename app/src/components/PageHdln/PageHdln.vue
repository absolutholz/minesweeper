<template>
	<component
		class="page-hdln"
		:is="nodeType"
	>
		<div
			v-if="!!(this.$slots.pre || [])[0]"
			class="page-hdln__pre"
		>
			<slot name="pre"></slot>
		</div>

		<slot />

		<div
			v-if="!!(this.$slots.post || [])[0]"
			class="page-hdln__post"
		>
			<slot name="post"></slot>
		</div>
	</component>
</template>

<script>
export default {
	name: 'PageHdln',

	props: {
		nodeType: {
			default: 'h1',
			required: false,
			type: String,
		},
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

.page-hdln {
	display: inline-block;
	font-size: 3rem;
	font-weight: $typography-weight-hairline;
	line-height: 1.2;

	@media (min-width: 400px) {
		font-size: 4rem;
	}

	@media (min-width: 600px) {
		font-size: 5rem;
	}

	abbr {
		text-decoration: none;
	}

	&__pre,
	&__post {
		font-size: 1rem;
		font-weight: $typography-weight-medium;
	}

	&__post {
		margin-top: 0.5em;
		text-align: right;
	}
}
</style>
