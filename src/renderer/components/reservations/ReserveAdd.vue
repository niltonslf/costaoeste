<template lang="html">
  <v-layout row wrap >
    <v-subheader class="title">Reservas</v-subheader>

    <v-layout row wrap px-4 pb-3>
      <v-flex xs6 sm6 md4>
        <v-menu
        ref="pickerCheckin"
        :close-on-content-click="false"
        v-model="pickerCheckin"
        :nudge-right="40"
        :return-value.sync="reserve.checkinDate"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        >
        <v-text-field
        slot="activator"
        v-model="reserve.checkinDate"
        label="Check-in"
        prepend-icon="event"
        readonly
        ></v-text-field>
        <v-date-picker v-model="reserve.checkinDate" @input="$refs.pickerCheckin.save(reserve.checkinDate)"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs6 sm6 md4>
      <v-menu
      ref="pickerCheckout"
      :close-on-content-click="false"
      v-model="pickerCheckout"
      :nudge-right="40"
      :return-value.sync="reserve.checkoutDate"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
      >
      <v-text-field
      slot="activator"
      v-model="reserve.checkoutDate"
      label="Check-out"
      prepend-icon="event"
      readonly
      ></v-text-field>
      <v-date-picker v-model="reserve.checkoutDate" @input="$refs.pickerCheckout.save(reserve.checkoutDate)"></v-date-picker>
    </v-menu>
  </v-flex>

  <v-flex xs12>
    <v-subheader class="title">Dados do hóspede</v-subheader>

    <v-layout row wrap>

      <v-flex xs12>
        <v-text-field
        v-model="guest.name" label="Nome do hóspede"
        required></v-text-field>
      </v-flex>


      <v-flex xs6>
        <v-text-field
        name="phone"
        label="(00) - 0000-000"
        class="input-group--focused"
        prepend-icon="phone"
        v-model="guest.tel"
        single-line
        ></v-text-field>
      </v-flex>

      <v-flex xs5 offset-xs1>
        <v-text-field
        v-model="guest.cpf" :counter="50" label="CPF"
        required></v-text-field>
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex xs12>
    <v-btn @click="submit" color="success">Salvar</v-btn>
    <v-btn @click="clear" color="error">Cancelar</v-btn>
  </v-flex>
</v-layout>

<v-divider></v-divider>

</v-layout>
</template>

<script>
import {database} from '../../connection'

export default {
  props:['object'],

  data: () => ({
    roomCollection: database().rooms,
    //Data picker
    pickerCheckin: false,
    pickerCheckout: false,

    // Reserve data
    reserve:{
      checkinDate:null,
      checkoutDate:null,
      status: 'vago',
      isChecked:false,
      guest:{},
    },
    // Guesta data
    guest:{
      name:'',
      tel:'',
      cpf:'',
    },
  }),

  methods:{
    submit(){
      console.log("Salve reserve");
      // Join data in a sigle object

      this.reserve.guest = this.guest;
      let reserveObject = this.reserve;

      console.log("Object updated");
      console.log(reserveObject);
      console.log("Save into database");
      // Get item to update
      let result = this.roomCollection.chain()
      .find({'$loki': this.object.$loki}).update(function(room){
        // add reserve object into room object
        console.log(room.reserves);
        room.reserves.splice(0,0,reserveObject);
      });
      console.log("Object saved:");
      console.log(result);
    },
    clear(){
      alert('cancelar');
    }
  }
}
</script>

<style lang="css">
</style>
