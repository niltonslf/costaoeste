<template>
	<v-layout row wrap>
		<v-flex xs12>
			<consumption-add :host="this.host" @updateList="updateList"></consumption-add>
		</v-flex>
		<v-flex xs12>
			<v-subheader class="title">Cosumo</v-subheader>

			<table class="table">
				<thead>
					<tr>
						<th>Produto</th>
						<th>valor</th>
						<th width="50">Ações</th>
					</tr>
				</thead>
				<tr v-for="item in consumptions">
					<td>{{item.name}}</td>
					<td>{{item.price}} R$</td>

					<td>
						<v-btn icon class="m-auto" @click="remove(item)">
							<v-icon color="red">delete</v-icon>
						</v-btn>
					</td>
				</tr>
			</table>
		</v-flex>
	</v-layout>
</template>

<script>
import {database} from '../../connection'
import ConsumptionAdd from './ConsumptionAdd'

export default {

	props:['host'],

	components:{
		ConsumptionAdd
	},

	data(){
		return{
			collection: database().consumption,
			consumptions:[],
			consumptionPrice: 0, // price of all items
		}
	},

	watch:{
		host: function(){
			this.loadData();
		}
	},

	methods:{
		/*
		* Load items from database and show tables
		*/
		loadData(){
			this.consumptions = this.collection.find({'hostId': this.host});
			this.getPrice();
		},
		/*
		* Remove host from list and database
		*/
		remove(object){
			// find from database
			let result = this.collection.findOne({
				'$loki': parseInt(object.$loki)
			});
			// remove item from database
			this.collection.remove(result);
			//Remove item from array
			this.consumptions.splice(this.consumptions.indexOf(object),1);

			this.getPrice();
			this.$emit('getConsumptionPice', this.consumptionPrice); // send consumptionPrice to parent component
		},
		/*
		* Update consumption list
		*/
		updateList(){
			this.loadData();
		},

		/*
		*	return consumption price
		*/
		getPrice(){
			this.consumptionPrice = 0; // reset consumptionPrice
			this.consumptions.forEach((element) => {
				this.consumptionPrice += parseFloat(element.price.replace(',','.'))
			});

			this.$emit('getConsumptionPice', this.consumptionPrice);
		}

	}, //end methods

	created(){
		this.loadData();
	}

}
</script>

<style lang="css">
</style>
