<template lang="html">
    <v-layout row wrap py-5>

      <v-flex xs4x>
        <v-text-field
        v-model="room.number"
        label="Número do quarto"
        required
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
        v-model="room.dailyPrice"
        :counter="30"
        label="Preço da diária"
        required
        ></v-text-field>
      </v-flex>
    </v-layout>
</template>

<script>
import {database} from '../../connection'

export default {

  data(){
    return {
      room: {},
      collection: database().rooms,
    }
  },
  methods:{
    addRoom(){
      let result = this.collection.insert({
        number: this.room.number,
        dailyPrice:  this.room.dailyPrice,
        reserves:[],  // this array will receive room reserves
      });
      console.log("Quarto adicionado!");
      this.room.$loki = result.$loki;
      this.$emit('updateList'); // emit this command to update room list
    },

  }
}
</script>

<style lang="css">
</style>
