<template>
  <div class="d-flex justify-content-between flex-wrap align-items-center">

    <card v-for="room in rooms"
    v-bind:status="room.status"
    v-bind:number="room.number"
    ></card>

  </div>
</template>

<script>
import {database} from '../connection'
import Card from './card/Card.vue';

export default{
  components: {
    Card,
  },

  data(){
    return{
      roomCollection: database().getCollection("rooms"),
      rooms:[]
    }
  },

  methods:{
    /*
    * Load items from database and show table
    */
    loadRoomList(){
      this.rooms = this.roomCollection.chain().simplesort('number').data();
      console.log("Room list loaded");
      console.log(this.rooms);
    },
  },

  computed:{

  },
  created(){
    this.loadRoomList();
  }
}
</script>

<style lang="css" scoped="true">

</style>
