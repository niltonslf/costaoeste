<template>
	<v-app id="inspire">

	<v-content>
		<v-container fluid  class="full-height">
			<!--  Load pages -->
			<router-view></router-view>
		</v-container>
	</v-content>
	</v-app>
</template>

<script>
export default {
}
</script>

<style>
.full-height{
	height: 100%;
}
</style>
