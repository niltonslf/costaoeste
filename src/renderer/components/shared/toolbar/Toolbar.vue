<template>
	<div>
		<v-toolbar
		:clipped-left="$vuetify.breakpoint.lgAndUp"
		color="blue darken-3" dark app fixed>

		<v-toolbar-title class="ml-0 pl-3">
			<span class="hidden-sm-and-down" @click="gotoPage('/home')">Hotel Costa oeste</span> /
			<slot name="app-title"></slot>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<slot name="app-picker"></slot>

		<v-btn icon color="white" @click="gotoPage('/')">
			<v-icon color="blue darken-3" >home</v-icon>
		</v-btn>

		<v-btn icon class="mx-0" color="white" @click="gotoPage('/reports')">
			<v-icon color="blue darken-3">attach_money</v-icon>
		</v-btn>

		<v-btn icon  color="white" @click="closeWindow" >
			<v-icon color="blue darken-3">exit_to_app</v-icon>
		</v-btn>
	</v-toolbar>
</div>
</template>

<script>
import { remote } from 'electron'

export default {
	data: () => ({
	}),
	methods:{
		gotoPage(routerName){
			this.$router.replace(routerName);
		},
		closeWindow(){
			remote.getCurrentWindow().close()
		}
	}, // end of methods

	created(){
	}
}
</script>

<style lang="css">
</style>
