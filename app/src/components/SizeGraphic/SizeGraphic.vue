<template>
	<figure class="size-graphic">
		<div
			class="size-graphic__grid"
			v-if="size === 'xs'"
		>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
			</div>
		</div>
		<div
			class="size-graphic__grid"
			v-if="size === 'sm'"
		>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
			</div>
		</div>
		<div
			class="size-graphic__grid"
			v-if="size === 'md'"
		>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
			</div>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
			</div>
		</div>
		<div
			class="size-graphic__grid"
			v-if="size === 'lg'"
		>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
			</div>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
			</div>
		</div>
		<div
			class="size-graphic__grid"
			v-if="size === 'xl'"
		>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
			</div>
			<div class="size-graphic__row">
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
				<div class="size-graphic__field"></div>
			</div>
		</div>
		<figcaption><slot /></figcaption>
	</figure>
</template>

<script>
import { SIZES } from './../game/Game';

export default {
	name: 'SizeGraphic',

	props: {
		size: {
			required: true,
			type: String,
			validator: function (value) {
				return SIZES.find((size) => size.id === value);
			},
		},
	},
};
</script>

<style lang="scss">
.size-graphic {
	&__grid {
		font-size: 20px;
	}

	&__row {
		display: flex;
		justify-content: center;
	}

	&__field {
		margin: 0.125em;

		&::before {
			border: 1px solid;
			border-color: #ccc #333 #333 #ccc;
			border-radius: 3px;
			content: "";
			display: block;
			height: 1em;
			width: 1em;
		}
	}
}
</style>
