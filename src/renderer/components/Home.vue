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


    <v-btn fab bottom right color="blue" dark fixed @click.stop="dialog = !dialog">

      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
        class="grey lighten-4 py-4 title"
        >
        Cadastrar quarto
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <create-room ref="form"></create-room>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="dialog = false"><b>Cancelar</b></v-btn>
        <v-btn flat @click="submit"><b>Salvar</b></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>

</template>

<script>
import {database} from '../connection';
import CreateRoom from './rooms/addRoom.vue'

export default{
  components:{
    CreateRoom,
  },

  data(){
    return{
      dialog: false,
      collection:database().rooms,
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
      this.rooms = this.collection.find({});
      console.log("Room list loaded");
      console.log(this.rooms);
    },

    submit(){
      this.$refs.form.addRoom(); // execute method to add data into database
      this.loadRoomList(); // reload room list
      this.dialog = false; // close modal
    }
  },

  computed:{
  },

  created(){
    this.loadRoomList(this.collection);
  }
}
</script>

<style lang="css" scoped="true">

</style>
