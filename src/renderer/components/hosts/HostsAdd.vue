<template lang="html">
	<v-layout row wrap >
		<v-dialog  v-model="dialog" width="70%">

			<v-btn fab bottom right slot="activator" color="blue"
			dark fixed @click.stop="dialog = !dialog">
			<v-icon class="fix-icon">add</v-icon>
		</v-btn>

		<v-card>
			<v-card-title
			class="headline grey lighten-2" primary-title>
			Hospedagem
		</v-card-title>

		<v-layout row wrap px-4 pb-3>
			<v-flex xs6 sm6 md4>
				<v-menu ref="pickerCheckin"
				transition="scale-transition">

				<v-text-field slot="activator" v-model="checkinFormated"
				label="Check-in" prepend-icon="event" readonly></v-text-field>

				<v-date-picker no-title v-model="host.checkin" @input="$refs.pickerCheckin.save(host.checkin)"></v-date-picker>
			</v-menu>
		</v-flex>
		<v-flex xs6 sm6 md4>
			<v-menu	ref="pickerCheckout" transition="scale-transition">

				<v-text-field slot="activator" v-model="checkoutFormated" label="Check-out" prepend-icon="event" readonly ></v-text-field>

				<v-date-picker no-title v-model="host.checkout" @input="$refs.pickerCheckout.save(host.checkout)"></v-date-picker>
			</v-menu>
		</v-flex>

		<v-flex xs3 sm3 md3 offset-md1 pt-4>
			<v-switch
			label="Cliente hospedado?"
			v-model="host.isChecked"
			></v-switch>
		</v-flex>

		<v-flex xs12>
			<v-subheader class="title">Dados do hóspede</v-subheader>
			<v-layout row wrap>

				<v-flex xs12>
					<v-text-field v-model="guest.name" label="Nome do hóspede" required></v-text-field>
				</v-flex>

				<v-flex xs6>
					<v-text-field label="(00) - 0000-000" class="input-group--focused" prepend-icon="phone" mask="(nn) nnnnn-nnnn" v-model="guest.tel" single-line ></v-text-field>
				</v-flex>

				<v-flex xs6 pl-4>
					<v-text-field
					v-model="guest.cpf" :counter="50" label="CPF"
					required></v-text-field>
				</v-flex>

				<v-flex xs5>
					<v-text-field
					v-model="guest.rg" :counter="50" label="RG"
					required></v-text-field>
				</v-flex>

				<v-flex xs7 pl-4>
					<v-text-field
					v-model="guest.address" :counter="50" label="Endereço"
					required></v-text-field>
				</v-flex>

			</v-layout>
		</v-flex>
	</v-layout>

	<v-divider></v-divider>

	<v-card-actions>
		<v-spacer></v-spacer>
		<v-btn @click="submit" color="success">Salvar</v-btn>
		<v-btn @click="clear" color="error">Cancelar</v-btn>
	</v-card-actions>
</v-card>
</v-dialog>

</v-layout>
</template>

<script>
import {database} from '../../connection'
import moment from 'moment'

export default {
	props:['object'],

	data: () => ({
		dialog: false,
		collection: null,
		//Data picker
		checkinFormated: null,
		pickerCheckin: false,
		checkoutFormated: null,
		pickerCheckout: false,
		// host data
		host:{

		},
		guest:{},
	}),

	watch:{
		'host.checkin': function(){
			this.checkinFormated = this.formatDate(this.host.checkin);
		},

		'host.checkout': function(){
			this.checkoutFormated = this.formatDate(this.host.checkout);
		}
	},

	methods:{
		formatDate (date) {
			if (!date) return null
			return moment(date).format('DD/MM/YYYY');
		},
		/*
		* Save data into database
		*/
		submit(){
			let result = this.collection.insert({
				checkin: this.host.checkin,
				checkout: this.host.checkout,
				isChecked:this.host.isChecked,
				checkedDate: new Date().toLocaleDateString(),
				isFinished: false,
				guest: this.guest,
				roomId: this.object.$loki,
			});

			this.clear(); // clear form
			this.$emit('updateList'); // emit this command to update location list
		},

		/*
		* load data
		*/
		loadData(){
			this.collection = database().hosts;
			this.checkinFormated = moment().format('DD/MM/YYYY');
			this.checkoutFormated = moment().add(1,'day').format('DD/MM/YYYY');
			this.host ={
				checkin:moment().format('YYYY-MM-DD'),
				checkout:moment().add(1,'day').format('YYYY-MM-DD'),
				isChecked:false,
				guest:{},
			}
		},
		/*
		* Clear form data
		*/
		clear(){
			this.dialog = false;
			this.host ={
				checkin:'',
				checkout:'',
				isChecked:false,
				guest:{},
			}
			this.guest = {
				name:'',
				tel:'',
				cpf:'',
			}
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
