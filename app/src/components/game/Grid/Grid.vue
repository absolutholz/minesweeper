<template>
	<list-unstyled
		class="grid"
		:ordered="true"
		:style="`--columns: ${ columns };`"
	>
		<li v-for="(field, index) in gridFields" :key="index">
			<field />
		</li>
	</list-unstyled>
</template>

<script>
import Field from './../Field';
import ListUnstyled from './../../ListUnstyled';

export default {
	name: 'Grid',

	components: {
		Field,
		ListUnstyled,
	},

	props: {
		fields: {
			required: true,
			type: Array,
		},
	},

	computed: {
		gridFields () {
			return this.fields;
		},

		columns () {
			return Math.ceil(Math.sqrt(this.fields.length));
		},

		rows () {
			return Math.ceil(this.fields.length / this.columns);
		},
	},
};
</script>

<style lang="scss">
.grid {
	display: grid;
	grid-auto-rows: 50px;
	grid-gap: 0.125rem;
	grid-template-columns: repeat(
		var(--columns),
		50px
	);
}
</style>
