<template lang="html">
	<v-layout row wrap class="login" justify-center align-center>
		<v-btn round color="primary elevation-2" dark @click.native="login"><b>Acessar sistema</b></v-btn>
	</v-layout>
</template>

<script>
import { remote } from 'electron'

export default {
	data(){
		return{

		}
	},
	methods:{
		login(){
			remote.getCurrentWindow().maximize();
			this.$router.replace('home');
		}
	},
	created(){
	}
}
</script>

<style lang="css">
html{
	overflow: auto !important;
}

.login{
	background: green;
	height:100%;
	background: url('~@/assets/login.jpg');
	background-size: cover;
	margin: -24px;
}
</style>
