<template>
	<div>
		<v-toolbar
		:clipped-left="$vuetify.breakpoint.lgAndUp"
		color="blue darken-3" dark app fixed>

		<v-toolbar-title style="width: 300px" class="ml-0 pl-3">
			<span class="hidden-sm-and-down" @click="gotoPage('/home')">Hotel Costa oeste</span>
		</v-toolbar-title>

		<v-text-field	flat solo-inverted prepend-icon="search"
		label="Buscar" class="hidden-sm-and-down mr-5"></v-text-field>


		<slot name="app-picker"></slot>

		<v-spacer></v-spacer>

		<v-btn icon @click="gotoPage('/')">
			<v-icon>home</v-icon>
		</v-btn>


		<v-btn icon>
			<v-icon>exit_to_app</v-icon>
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
