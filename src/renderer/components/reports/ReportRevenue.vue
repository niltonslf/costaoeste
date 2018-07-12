<template>
	<v-dialog v-model="dialog" width="80%">

		<v-btn fab bottom right slot="activator" color="blue" dark fixed @click.stop="dialog = !dialog">
			<v-icon class="fix-icon">add</v-icon>
		</v-btn>

		<v-card>
			<v-card-title	class="headline grey lighten-2" primary-title>
				Receita do período
			</v-card-title>

			<v-layout row wrap pa-2>
				Receita com hospedagens: {{hostRevenue}}
				Receita com produtos consumidos: {{consumptionRevenue}}
				Total:
			</v-layout>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="close" color="error">Fechar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import _ from "lodash";
import {database} from '../../connection'
import moment from 'moment'

export default {
	props:['dialog'],
	data(){
		return{
			hostRevenue: 0,
			consumptionRevenue: 0,
			products:[],
			hosts:[],
		}
	},

	methods:{
		formatDate (date) {
			if (!date) return null
			return moment(date).format('DD/MM/YYYY');
		},
		/*

		/*
		* Load data
		*/
		loadData(){
			this.loadConsumptionData();
			this.loadHostData();
		},

		/*
		*	Calculate price of itens and and total into a variable
		*/
		getConsumptionRevenue(){
			this.products.forEach((elem) => {
				let price = elem.price.toString();
				this.consumptionRevenue += parseFloat(price.replace(',','.'));
			});
		},
		/*
		* Load items from database
		*/
		loadConsumptionData(){
			this.products = database().consumption.chain().simplesort('name').data();
			this.getConsumptionRevenue();
		},

		/*
		*	Calculate price of itens and and total into a variable
		*/
		getHostRevenue(){
			this.hosts.forEach((elem) => {
				let price;
				try {
					price = elem.totalPrice.toString();
				} catch (e) {
					price = '0,00';
				}

				console.log("Price: "+price);
				console.log(elem);

				this.hostRevenue += parseFloat(price.replace(',','.'));
			});

			alert(this.hostRevenue);
		},
		/*
		* Load items from database
		*/
		loadHostData(){
			this.hosts = database().hosts.chain().simplesort('$loki').data();
			this.getHostRevenue();
		},

		/*
		* Close modal
		*/
		close(){
			this.$emit('closeHostDialog');
		}
	}, // end methods

	created(){
		this.loadData();
	}
}
</script>

<style lang="css">
</style>
