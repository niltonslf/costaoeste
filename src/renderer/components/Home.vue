<template>
  <div class="d-flex justify-content-between flex-wrap align-items-center">

    <card status="vacant"></card>
    <card status="busy"></card>
    <card status="reserved"></card>
    <card status="vacant"></card>
    <card status="busy"></card>
    <card status="reserved"></card>
    <card status="vacant"></card>
    <card status="vacant"></card>
    <card status="vacant"></card>
    <card status="vacant"></card>
    <card status="busy"></card>
    <card status="reserved"></card>

  </div>
</template>

<script>
import Card from './card/Card.vue';

export default{
  components: {
    Card,
  },

  data(){
    return{

    }
  }
}
</script>

<style lang="css" scoped="true">

</style>
