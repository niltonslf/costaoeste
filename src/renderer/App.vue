<template>
	<v-app id="inspire">
		<v-toolbar
		:clipped-left="$vuetify.breakpoint.lgAndUp"
		color="blue darken-3" dark app fixed>

		<v-toolbar-title style="width: 300px" class="ml-0 pl-3">
			<span class="hidden-sm-and-down" @click="gotoPage('/home')">Hotel Costa oeste</span>
		</v-toolbar-title>
		<v-text-field
		flat
		solo-inverted
		prepend-icon="search"
		label="Buscar"
		class="hidden-sm-and-down"
		></v-text-field>
		<v-spacer></v-spacer>

		<v-menu
		ref="pickerStatus" :close-on-content-click="false" v-model="pickerStatus"
		:nudge-right="40" :return-value.sync="pickerDate"
		lazy transition="scale-transition" offset-y full-width min-width="290px">
		<v-text-field slot="activator" v-model="pickerDate" label="Check-out" prepend-icon="event" readonly ></v-text-field>
		<v-date-picker v-model="pickerDate" @input="$refs.pickerStatus.save(pickerDate)"></v-date-picker>
	</v-menu>

	<v-btn icon @click="gotoPage('/')">
		<v-icon>home</v-icon>
	</v-btn>

	<v-btn icon>
		<v-icon>exit_to_app</v-icon>
	</v-btn>
</v-toolbar>

<v-content>
	<v-container fluid  class="full-height">
		<!--  Load pages -->
		<!-- <router-view></router-view> -->

		<home :filterDate="pickerDate"></home>

	</v-container>
</v-content>
</v-app>
</template>

<script>
import {database} from './connection.js';
import Home from './components/Home.vue';

export default {
	components:{
		Home
	},

	data: () => ({
		//Data picker
		pickerStatus: false,
		pickerDate:'2018-07-04',
	}),
	watch:{
		pickerDate(val){
			// //console.log(val);
			// console.log(this.$children[0].$children[1].$children[0].filterDate);
			// this.$children[0].$children[1].$children[0].filterDate = '2018-07-30'
		}
	},
	methods:{
		gotoPage(routerName){
			this.$router.replace(routerName);
		},
	}
}
</script>

<style>
.full-height{
	height: 100%;
}
</style>
