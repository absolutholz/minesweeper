<template>
	<div class="board">
		<div class="board__playing-field board__inset">
			<slot />
		</div>
		<div class="board__status">
			<slot name="status" />
		</div>
		<div class="board__actions">
			<slot name="actions" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Board',
};
</script>

<style lang="scss">
.board {
	display: grid;
	grid-gap: 1rem;
	grid-template-areas:
		"field"
		"status"
		"actions";
	grid-template-columns: 1fr;
	grid-template-rows: 1fr auto auto;

	@media (orientation: landscape) {
		grid-template-areas:
			"field status"
			"field actions";
		grid-template-columns: 1fr auto;
		grid-template-rows: 1fr auto auto;
	}

	bottom: 0;
	height: 100%;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;

	background: white;
	padding: 1rem;

	@media (min-width: 900px) {
		--gap: var(--spacing-base);
	}

	&__inset {
		background: Hsla(0, 0%, 90%, 1);
		border-radius: 4px;
		box-shadow:
			inset 0 2px 4px -1px rgba(0, 0, 0, 0.2),
			inset 0 4px 5px 0 rgba(0, 0, 0, 0.14),
			inset 0 1px 10px 0 rgba(0, 0, 0, 0.12);

		padding: 1rem;
		position: relative;
		z-index: 0;

		// .t-dark & {
		// 	background: Hsla(0, 0%, 0%, 1);
		// }
	}

	&__playing-field {
		align-items: center;
		display: flex;
		grid-area: field;
		justify-content: center;
		overflow: hidden;
	}

	&__status {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		grid-area: status;
		// justify-content: space-between;
	}

	&__actions {
		grid-area: actions;
	}
}
</style>
