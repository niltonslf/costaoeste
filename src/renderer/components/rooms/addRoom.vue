<template lang="html">
  <form class="row mt-4 alert alert-success" @submit.prevent="addRoom">
    <div class="form-group col-sm-4">
      <label for="number">Número do quarto</label>
      <input type="text" class="form-control" id="number" v-model="room.number">
    </div>
    <div class="form-group col-sm-4">
      <label for="preco">Diária</label>
      <input type="text" class="form-control" id="preco" v-model="room.dailyPrice">
    </div>

    <div class="form-group col-sm-4">
      <input type="submit" value="Inserir" class="btn btn-primary mt-4">
      <a class="btn btn-danger text-white mt-4" @click="cancel">Cancelar</a>
    </div>
  </form>
</template>

<script>
import {database} from '../../connection'

export default {

  data(){
    return {
      room: {
        // $loki:"", // this is used to show id after be inserted
        number: "",
        dailyPrice: 20, // Default daily price
      },
    }
  },
  methods:{
    addRoom(){
      let roomCollection = database().getCollection("rooms");
      let result = roomCollection.insert({
        number: this.room.number,
        dailyPrice:  this.room.dailyPrice,
      });
      console.log("Quarto adicionado!");
      this.room.$loki = result.$loki;
      this.$emit('updateList');
    },

    cancel(){
      this.$emit('cancel');
    },
  }
}
</script>

<style lang="css">
</style>
