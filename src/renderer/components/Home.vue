<template>

  <v-layout row wrap>

    <v-flex xs3 pa-2 v-for="room in rooms">
      <v-card color="green darken-2" class="white--text">
        <v-card-title primary-title>
          <div class="headline">Quarto: {{room.number}}</div>
          <div>Hóspede: João da silva</div>
          <div>Checkin: 10/10/2018</div>
          <div>Checkout: 20/10/2018</div>
        </v-card-title>
        <v-card-actions>
          <v-btn depressed small @click.native="gotoPage('room',room.$loki)">Ver quarto</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>

</template>

<script>
import {database} from '../connection';

export default{

  data(){
    return{
      roomCollection: database().rooms,
      rooms:[],
    }
  },

  methods:{
    gotoPage(routerName,roomId){
      this.$router.props={roomId: roomId};
      this.$router.replace(routerName);
      console.log(this.$router);
    },

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
