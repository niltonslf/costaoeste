<template lang="html">
	<v-layout row wrap >
		<v-dialog  v-model="modal" width="90%">

			<v-card>
				<v-card-title	class="headline grey lighten-2" primary-title>
					Editar hospedagem
				</v-card-title>

				<v-layout row wrap px-4 py-3>
					<v-flex xs8>
						<v-layout row wrap>
							<v-flex xs2>
								<v-menu ref="pickerCheckin"
								transition="scale-transition">

								<v-text-field slot="activator" v-model="checkinFormated"
								label="Check-in" prepend-icon="event" readonly></v-text-field>

								<v-date-picker no-title v-model="host.checkin" @input="$refs.pickerCheckin.save(host.checkin)"></v-date-picker>
							</v-menu>
						</v-flex>

						<v-flex xs2>
							<v-menu	ref="pickerCheckout" transition="scale-transition">

								<v-text-field slot="activator" v-model="checkoutFormated" label="Check-out" prepend-icon="event" readonly ></v-text-field>

								<v-date-picker no-title v-model="host.checkout" @input="$refs.pickerCheckout.save(host.checkout)"></v-date-picker>
							</v-menu>
						</v-flex>


						<v-flex xs3 pl-4>
							<v-text-field
							v-model="host.dailyPrice"
							v-money="money"
							label="Preço da diária"
							required
							></v-text-field>
						</v-flex>


						<v-flex xs3 mt-4 pl-4>
							<v-switch label="Já hospedado?" v-model="host.isChecked"></v-switch>
						</v-flex>
						<v-flex xs2 mt-4>
							<v-switch color="red" value input-value="true" label="Finalizar?" v-model="host.isFinished"></v-switch>
						</v-flex>

					</v-layout>

					<v-subheader class="title">Dados do hóspede</v-subheader>
					<v-layout row wrap>

						<v-flex xs6>
							<v-text-field v-model="host.guest.name" label="Nome do hóspede"
							required></v-text-field>
						</v-flex>

						<v-flex xs3>
							<v-text-field label="(00) - 0000-000" class="input-group--focused" prepend-icon="phone" mask="(nn) nnnnn-nnnn" v-model="host.guest.tel" single-line ></v-text-field>
						</v-flex>

						<v-flex xs3 pl-4>
							<v-text-field
							v-model="host.guest.cpf" :counter="50" label="CPF"
							required></v-text-field>
						</v-flex>

						<v-flex xs6>
							<v-text-field
							v-model="host.guest.rg" :counter="50" label="RG"
							required></v-text-field>

							<v-text-field
							v-model="host.guest.address" :counter="50" label="Endereço"
							required></v-text-field>
						</v-flex>

						<v-flex xs6 pl-4>
							<v-text-field
							label="Observação"
							name="name"
							v-model="host.observation"
							textarea
							rows="4"
							></v-text-field>
						</v-flex>


					</v-layout>
				</v-flex>
				<v-flex xs4 pl-4>
					<consumption-list :host="host.$loki" @getConsumptionPice="getConsumptionPice"></consumption-list>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>

			<v-card-actions>
				<v-chip color="blue lighten-2" label small class="pa-2 ml-0">
					<h1 class="title">Hospedagem: <b> {{formatMoney(daysHostedPrice)}} R$</b></h1>
				</v-chip>

				<v-chip color="purple lighten-2" label small class="pa-2 ml-0">
					<h1 class="title">Consumo: <b> {{formatMoney(consumptionTotalPrice)}} R$</b></h1>
				</v-chip>
				<v-chip color="green lighten-2" label small class="pa-2 ml-0">
					<h1 class="title">Total: <b> {{formatMoney(totalPrice)}} R$</b></h1>
				</v-chip>

				<v-spacer></v-spacer>

				<v-btn @click="submit" color="info">Atualizar</v-btn>
				<v-btn @click="clear" color="error">Cancelar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

</v-layout>
</template>

<script>
import {database} from '../../connection'
import moment from 'moment'
import ConsumptionList from './ConsumptionList'
import {VMoney} from 'v-money'

export default {
	props:['modal','host'],
	components:{
		ConsumptionList
	},

	directives: {
		money: VMoney
	},

	data: () => ({
		collection: null,
		collectionRoom: null,
		//Data picker
		checkinFormated: null,
		pickerCheckin: false,
		checkoutFormated: null,
		pickerCheckout: false,
		hostId: null,

		// Mask money
		money:{
			decimal: '.',
			thousands: ',',
			precision: 2,
		},

		// prices
		daysHostedPrice: 0.0,
		consumptionTotalPrice: 0.0,
		totalPrice:0.0,
	}),

	watch:{
		host: function(){
			this.hostId = this.host.$loki;
		},
		'host.checkin': function(){
			this.checkinFormated = this.formatDate(this.host.checkin);
			this.getHostPice();
		},
		'host.checkout': function(){
			this.checkoutFormated = this.formatDate(this.host.checkout);
			this.getHostPice();
		},
		'host.dailyPrice': function(){
			this.getHostPice();
		}
	},
	methods:{
		formatMoney(money){
			return money.toFixed(2);
		},
		formatDate (date) {
			if (!date) return null
			return moment(date).format('DD/MM/YYYY');
		},
		/*
		*	Load data
		*/
		loadData(){
			this.collection = database().hosts;
			this.collectionRoom = database().rooms;
			this.hostId = this.host.$loki; // set what host was been edited
			this.checkinFormated = moment().format('DD/MM/YYYY'); // format date
			this.getHostPice(); // calc host price
			this.getTotalPice(); // calc total price to pay
		},

		/*
		*	Get price of consumption
		*/
		getConsumptionPice: function(value){
			this.consumptionTotalPrice = value;
			this.getTotalPice(); // Update total price with consumption price
		},
		/*
		*	Get price of hosts
		*/
		getHostPice(){
			let checkinDate = moment(this.host.checkin);
			let checkoutDate = moment(this.host.checkout);
			let daysHosted = checkoutDate.diff(checkinDate, 'days');
			this.daysHostedPrice = this.host.dailyPrice * daysHosted; // set host price

			this.getTotalPice(); // calc total price to pay
		},
		/*
		*	Get price of
		*/
		getTotalPice(){
			this.totalPrice =  this.consumptionTotalPrice + this.daysHostedPrice;
		},
		/*
		* Save data into database
		*/
		submit(){
			var object = this.collection.findOne({'$loki': this.host.$loki});
			// set new values into object loaded
			object.checkedDate = this.host.checkedDate;
			object.checkin = this.host.checkin;
			object.checkout = this.host.checkout;
			object.guest = this.host.guest;
			object.isChecked = this.host.isChecked;
			object.isFinished = this.host.isFinished;
			object.meta = this.host.meta;
			object.roomId = this.host.roomId;
			object.daysHostedPrice = this.daysHostedPrice
			object.consumptionTotalPrice = this.consumptionTotalPrice
			object.totalPrice = this.totalPrice;
			object.observation= this.host.observation;
			object.dailyPrice= this.host.dailyPrice;
			//update
			this.collection.update(object);
			//clode modal
			this.clear();
		},
		/*
		* Clear form data
		*/
		clear(){
			this.modal = false;
			this.$emit('modalClosed'); // emit this command to update location list
		},
	}, // end methods
	created(){
		this.loadData();
	}
}
</script>

<style lang="css">
.fix-icon{
	margin-top: 25px;
}
</style>
