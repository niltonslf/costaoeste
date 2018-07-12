<template>
	<v-layout row wrap>
		<v-flex xs12>
			<v-card>
				<v-card-title	class="headline grey lighten-2" primary-title>
					Relatório de produtos consumidos
				</v-card-title>

				<v-layout row wrap pa-2>

					<v-flex xs12 mb-2>
						<v-chip color="green lighten-2" label small class="pa-2 ml-0">
							<h1 class="title">Receita: <b> {{revenue}} R$</b></h1>
						</v-chip>
					</v-flex>


					<v-flex xs12>
						<v-data-table
						:headers="headers"
						:items="list"
						hide-actions
						class="elevation-1">
						<template slot="items" slot-scope="props">
							<td class="text-xs-center">{{props.item.name}}</td>
							<td class="text-xs-left">{{props.item.price}}</td>
						</template>
					</v-data-table>
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
			//Search
			sortProperty: "id",
			sortDirection: "desc",
			filterTerm: "",
			//Table
			headers: [
				{ text: 'Produto', value: 'name', width:50},
				{ text: 'Valor', value: 'price'},
			],
			products:[],
			revenue:0,
		}
	},
	watch:{
		startDate: function(){
			this.loadData();
		},
		endDate: function(){
			this.loadData();
		}
	},
	methods:{
		formatDate (date) {
			if (!date) return null
			return moment(date).format('DD/MM/YYYY');
		},
		/*
		*  sort item list
		*/
		sort(event,property){
			event.preventDefault();
			this.sortProperty = property;

			if (this.sortDirection == "asc") {
				this.sortDirection = "desc";
			} else {
				this.sortDirection = "asc";
			}
		},
		getRevenue(){
			this.revenue = 0;
			this.products.forEach((elem) => {
				let price = elem.price.toString();
				this.revenue += parseFloat(price.replace(',','.'));
			});
		},

		/*
		* Load items from database and show table
		*/
		loadData(){
			let startDate = this.startDate;
			let endDate = this.endDate;

			this.products = database().consumption.where(function(obj){
				return (moment(obj.meta.created).format('YYYY-MM-DD') >= startDate  && moment(obj.meta.created).format('YYYY-MM-DD') <= endDate);
			});

			this.getRevenue();
		},
		/*
		* Close modal
		*/
		close(){
			this.$emit('closeHostDialog');
		}
	}, // end methods
	computed:{
		/**
		* Return data sorted and filtered
		*/
		list() {
			const filter = this.filterTerm;
			const list = _.orderBy(this.products, this.sortProperty, this.sortDirection);

			if (_.isEmpty(filter)) {
				return list;
			}

			return _.filter(
				list,
				product => product.name.toLowerCase().indexOf(filter) >= 0
			);
		}
	},
	created(){
		this.loadData();
	}
}
</script>

<style lang="css">
</style>
