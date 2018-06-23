<template lang="html">
  <section>
    <h2 class="h3">Quarto: {{room.number}}</h2>

    <div class="">
      <span>Preço diária: {{room.dailyPrice}}</span>
    </div>


    <div class="">
      <h3>Reservas</h3>

      <div class="col-md-6 alert-secondary">

      </div>

    </div>

  </section>
</template>

<script>
export default {
  data(){
    return{
      room:{
        number:'0',
        dailyPrice:'R$ 20,00',
      }
    }
  }
}
</script>

<style lang="css">
</style>
