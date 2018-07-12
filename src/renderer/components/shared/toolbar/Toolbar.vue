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

		<v-btn icon  color="white" >
			<v-icon color="blue darken-3">exit_to_app</v-icon>
		</v-btn>
	</v-toolbar>
</div>
</template>

<script>
export default {
	data: () => ({
		//Data picker
		pickerStatus: false,
		pickerDate:'2018-07-04',
	}),
	methods:{
		gotoPage(routerName){
			this.$router.replace(routerName);
		},
	}, // end of methods
	watch:{
		pickerDate(val){
			// //console.log(val);
			// console.log(this.$children[0].$children[1].$children[0].filterDate);
			// this.$children[0].$children[1].$children[0].filterDate = '2018-07-30'
		}
	},
}
</script>

<style lang="css">
</style>
