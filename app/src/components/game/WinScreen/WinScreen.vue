<template>
	<div class="win-screen">Congratulations!</div>
</template>

<script>
export default {
	name: 'WinScreen',
};
</script>

<style lang="scss">
.win-screen {
	align-items: center;
	bottom: 0;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 1;

	color: white;
	font-size: 2rem;
	font-weight: bold;
	padding: var(--spacing-base);
	text-align: center;
	text-shadow:
		0px 0px 20px black,
		0px 0px 10px var(--primary),
		0px 0px 5px black;

	@media (min-width: 400px) {
		font-size: 3rem;
	}

	@media (min-width: 600px) {
		font-size: 4rem;
	}
}
</style>
