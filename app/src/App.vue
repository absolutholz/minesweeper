<template>
	<router-view />
</template>

<script>
if (window.localStorage.primarySurface) {
	document.body.style.setProperty('--primary', window.localStorage.primarySurface);
}

if (window.localStorage.primaryOnSurface) {
	document.body.style.setProperty('--on-primary', window.localStorage.primaryOnSurface);
}

export default {
	name: 'App',
};
</script>

<style lang="scss">
@import "./scss/base";
</style>
