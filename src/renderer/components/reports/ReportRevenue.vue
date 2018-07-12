<template>
	<v-layout row wrap>
		<v-flex xs12>
			<v-card>
				<v-card-title	class="headline grey lighten-2" primary-title>
					Receita do período
				</v-card-title>

				<v-layout row wrap pa-2>
					<v-flex xs4>
						<v-chip label class="w100" color="purple" text-color="white">
							<v-icon left>attach_money</v-icon>Hospedagens:<b class="headline pl-2"> {{hostRevenue}} R$</b>
						</v-chip>
					</v-flex>

					<v-flex xs4>
						<v-chip label class="w100" color="pink" text-color="white">
							<v-icon left>attach_money</v-icon>Produtos:<b  class="headline pl-2"> {{consumptionRevenue}} R$</b>
						</v-chip>
					</v-flex>

					<v-flex xs4>
						<v-chip label class="w100" color="green" text-color="white">
							<v-icon left>attach_money</v-icon>Total: <b class="headline pl-2">{{revenueTotal}} R$</b>
						</v-chip>
					</v-flex>
				</v-layout>

				<v-divider></v-divider>

			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import _ from "lodash";
import {database} from '../../connection'
import moment from 'moment'

export default {
	props:['dialog','startDate','endDate'],
	data(){
		return{
			hostRevenue: 0,
			consumptionRevenue: 0,
			products:[],
			hosts:[],
		}
	},
	watch:{
		startDate: function(){
			this.loadConsumptionData();
			this.loadHostData();
		},
		endDate: function(){
			this.loadConsumptionData();
			this.loadHostData();
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
			this.consumptionRevenue = 0;
			this.products.forEach((elem) => {
				let price = elem.price.toString();
				this.consumptionRevenue += parseFloat(price.replace(',','.'));
			});

			this.loadRevenueTotal();
		},
		/*
		* Load items from database
		*/
		loadConsumptionData(){
			let startDate = this.startDate;
			let endDate = this.endDate;

			this.products = database().consumption.where(function(obj){
				return (moment(obj.meta.created).format('YYYY-MM-DD') >= startDate  && moment(obj.meta.created).format('YYYY-MM-DD') <= endDate);
			});

			this.getConsumptionRevenue();

		},

		/*
		*	Calculate price of itens and and total into a variable
		*/
		getHostRevenue(){
			this.hostRevenue = 0;
			this.hosts.forEach((elem) => {
				let price = elem.totalPrice.toString();
				this.hostRevenue += parseFloat(price.replace(',','.'));
			});
			console.log(this.hostRevenue);
			//Update total
			this.loadRevenueTotal();
		},
		/*
		* Load items from database
		*/
		loadHostData(){
			let startDate = this.startDate;
			let endDate = this.endDate;

			this.hosts = database().hosts.where(function(obj){
				return (obj.checkin >= startDate  && obj.checkout <= endDate && obj.isFinished == true);
			});

			this.getHostRevenue();
		},

		loadRevenueTotal(){
			this.revenueTotal= 0;// reset
			console.log(this.hostRevenue);
			console.log(this.consumptionRevenue);
			this.revenueTotal = this.hostRevenue + this.consumptionRevenue;
		},

	}, // end methods

	created(){
		this.loadData();
	}
}
</script>

<style lang="css">
.w100{
	width:98%;
	padding: 5px;
	margin:2px;
}
</style>
