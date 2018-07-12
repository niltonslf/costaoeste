<template lang="html">
    <v-layout row wrap py-5>

      <v-flex xs4x>
        <v-text-field
        v-model="room.number"
        label="Número do quarto"
        required
        ></v-text-field>
      </v-flex>

    </v-layout>
</template>

<script>
import {database} from '../../connection'
import {VMoney} from 'v-money'

export default {
	directives: {
		money: VMoney
	},

  data(){
    return {
      room: {},
    }
  },
  methods:{
    addRoom(){
      let result = database().rooms.insert({
        number: this.room.number,
        status: 'vacant',
      });
      this.room.$loki = result.$loki;
      this.$emit('updateList'); // emit this command to update room list
    },

  }
}
</script>

<style lang="css">
</style>
