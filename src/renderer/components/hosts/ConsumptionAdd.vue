<template>
	<v-layout row wrap>
		<v-flex xs12 md12>
			<v-subheader class="title">Adicionar consumo</v-subheader>
		</v-flex>

		<v-flex xs5 pr-2>
			<v-text-field label="Produto" required v-model="consumption.name"></v-text-field>
		</v-flex>

		<v-flex xs5 pl-2>
			<v-text-field required v-model="consumption.price" v-money="money"></v-text-field>
		</v-flex>

		<v-flex xs2 pl-2>
			<v-btn icon class="blue mx-0" @click="saveConsumption(consumption)">
				<v-icon color="white">add</v-icon>
			</v-btn>
		</v-flex>

	</v-layout>
</template>

<script>
import {database} from '../../connection'
import {VMoney} from 'v-money'

export default {
	props: ['host'],

	data(){
		return{
			collection: database().consumption,
			consumption:{
				name: '',
				price: 0,
			},
			money: {
				decimal: ',',
				thousands: '.',
				prefix: 'R$ ',
				precision: 2,
			}

		}
	},

	directives: {
		money: VMoney
	},

	methods:{
		saveConsumption(){
			let productPrice = this.consumption.price.split(' ');
			let result = this.collection.insert({
				name: this.consumption.name,
				price: productPrice[1],
				hostId: this.host,
			});
			this.clear(); // clear form
			this.$emit('updateList'); // emit this command to update location list
		},
		/*
		* Clear form data
		*/
		clear(){
			this.dialog = false;
			this.consumption ={
				name: '',
				price: 0,
			}

		},
	}, // end methods

}
</script>

<style lang="css">
</style>
