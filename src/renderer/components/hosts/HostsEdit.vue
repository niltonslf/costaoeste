<template lang="html">
  <v-layout row wrap >
    <v-dialog  v-model="modal" width="70%">

      <v-card>
        <v-card-title
        class="headline grey lighten-2" primary-title>
        Editar hospedagem
      </v-card-title>

      <v-layout row wrap px-4 pb-3>
        <v-flex xs6 sm6 md4>
          <v-menu ref="pickerCheckin"
          :close-on-content-click="false" v-model="pickerCheckin" :nudge-right="40" :return-value.sync="host.checkin"
          lazy transition="scale-transition" offset-y full-width
          min-width="290px">

          <v-text-field slot="activator" v-model="host.checkin"  label="Check-in" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="host.checkin" @input="$refs.pickerCheckin.save(host.checkin)"></v-date-picker>

        </v-menu>
      </v-flex>
      <v-flex xs6 sm6 md4>
        <v-menu
        ref="pickerCheckout" :close-on-content-click="false" v-model="pickerCheckout" :nudge-right="40" :return-value.sync="host.checkout" lazy transition="scale-transition" offset-y full-width min-width="290px">
        <v-text-field slot="activator" v-model="host.checkout" label="Check-out" prepend-icon="event" readonly ></v-text-field>
        <v-date-picker v-model="host.checkout" @input="$refs.pickerCheckout.save(host.checkout)"></v-date-picker>
      </v-menu>
    </v-flex>

    <v-flex xs3 sm3 md3 offset-md1 pt-4>
      <v-switch label="Checkin realizado?" v-model="host.isChecked"></v-switch>
    </v-flex>


    <v-flex xs12>
      <v-subheader class="title">Dados do hóspede</v-subheader>
      <v-layout row wrap>

        <v-flex xs12>
          <v-text-field v-model="guest.name" label="Nome do hóspede" required></v-text-field>
        </v-flex>

        <v-flex xs4>
          <v-text-field name="phone" label="(00) - 0000-000" class="input-group--focused" prepend-icon="phone" v-model="guest.tel" single-line ></v-text-field>
        </v-flex>

        <v-flex xs3 offset-xs1>
          <v-text-field
          v-model="guest.cpf" :counter="50" label="CPF"
          required></v-text-field>
        </v-flex>

        <v-flex xs3 offset-xs1>
          <v-text-field
          v-model="guest.cpf" :counter="50" label="RG"
          required></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
          v-model="guest.cpf" :counter="50" label="Endereço"
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


export default {

	props:{
		modal:{
			default:false,
		}
	},

  data: () => ({
    collection: database().hosts,
    //Data picker
    pickerCheckin: false,
    pickerCheckout: false,
    // host data
    host:{},
    // Guesta data
    guest:{},
  }),

  methods:{
    /*
    * Save data into database
    */
    submit(){
      // Put guest data into host object
      this.host.guest = this.guest;

      let result = this.collection.insert({
        checkin: this.host.checkin,
        checkout: this.host.checkout,
        isChecked:false,
        checkedDate: new Date().toLocaleDateString(),
        isFinished: false,
        guest: this.guest,
        roomId: this.object.$loki,
      });

      this.clear(); // clear form
      this.$emit('updateList'); // emit this command to update location list
    },

    /*
    * Clear form data
    */
    clear(){
      this.modal = false;
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

}
</script>

<style lang="css">
.fix-icon{
  margin-top: 25px;
}
</style>
