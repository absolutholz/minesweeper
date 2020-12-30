<template>
	<div class="rich-text"><slot /></div>
</template>

<script>
export default {
	name: 'RichText',
};
</script>

<style lang="scss">
.rich-text {
	max-width: 75ch;

	> *:first-child {
		margin-top: 0;
	}

	> *:last-child {
		margin-bottom: 0;
	}
}
</style>
