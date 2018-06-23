<template lang="html">
  <div class="">

    <form method="post" v-on:submit.prevent="persistData" >

      <h3>Dados da locação</h3>
      <div class="row">
        <label class="col-md-2">
          Quarto
          <select  class="form-control" v-model="location.roomNumber" name="room-number" >
            <option v-for="room in rooms" v-bind:value="room.value" >{{room.text}}</option>

          </select>
        </label>

        <label class="col-md-2">
          Diária
          <input type="text" class="form-control" v-model="location.dailyPrice" name="daily-price" disabled readonly>
        </label>

        <label class="col-md-4">
          Data de entrada
          <input type="text" class="form-control" v-model="location.checkin" name="checkin" >
        </label>

        <label class="col-md-4">
          Data de saída
          <input type="text" class="form-control" v-model="location.checkout" name="checkout" >
        </label>
      </div>

      <hr>

      <h3>Dados do hóspede</h3>
      <div class="row">
        <label class="col-md-12">
          Nome:
          <input type="text" class="form-control" v-model="location.clientName" name="client-name" >
        </label>
        <label class="col-md-3">
          Telefone:
          <input type="text" class="form-control" v-model="location.clientPhone" name="client-phone" >
        </label>
        <label class="col-md-3">
          CPF:
          <input type="text" class="form-control" v-model="location.clientCpf" name="client-cpf" >
        </label>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-6 d-flex justify-content-between">
          <input type="submit" class="btn btn-success" name="locate" value="Fazer locação">

          <input type="submit" class="btn btn-warning" name="reserv" value="Fazer reserva">

          <router-link :to="{ name: 'home'}" class="btn btn-danger">Cancelar</router-link>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
export default {
  data(){
    return{
      rooms: [
        { text: 'Um', value: 'A' },
        { text: 'Dois', value: 'B' },
        { text: 'Três', value: 'C' }
      ],
      location: {
        roomNumber:'',
        dailyPrice: 20.00,
        checkin: '',
        checkout: '',
        clientName: '',
        clientPhone: '',
        clientCpf: '',
        locate: '',
        reserv: '',
      },
    }
  },
  methods: {
    persistData(){
      console.log(this.location);
    }
  }
}
</script>

<style lang="css">
</style>
