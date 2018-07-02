<template>
  <v-layout row wrap class="full-height">
    <div class="grid-container">
      <div class="grid-item" v-for="room in rooms">
        <v-card :color="(room.status == 'vacant' ? 'green' : room.status) +' darken-2'" class="pointer full-height white--text" @click.native="gotoPage('room',room.$loki)">
          <v-card-title primary-title>
            <h1 class="headline">
              Quarto: {{room.number}}
            </h1>
            <span class="label">
              <v-icon small>people</v-icon>
              Hóspede: João da silva
            </span>
            <span class="label">
              <v-icon small>today</v-icon>
              Checkin: 10/10/2018
            </span><br>
            <span class="label">
              <v-icon small>today</v-icon>
              Checkout: 20/10/2018
            </span>
          </v-card-title>
        </v-card>
      </div>
    </div>

    <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
        class="grey lighten-4 py-4 title">
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
      hostsCollection:database().hosts,
      rooms:[],
      hosts:[],

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
      this.checkRoomStatus();
    },

    findHost(roomId){
      return this.hostsCollection.find({'roomId': roomId});
    },

    /**
    * Run and excute child method to save data into database
    */
    submit(){
      this.$refs.form.addRoom(); // execute method to add data into database
      this.loadRoomList(); // reload room list
      this.dialog = false; // close modal
    },

    /*
    * Verifiy if room is busy, reserved or free
    */
    checkRoomStatus(){
      console.log("***Checking room status***");
      let today = new Date().toLocaleDateString('en-GB'); // date being verified
      let date = today.split('/');
      let todayFormated = date[2]+"-"+date[1]+"-"+date[0];

      this.rooms.map((room) => { //goes through the array of rooms comparing the hosts with that same room
        let host = this.findHost(room.$loki); // select the room that contains the id in host
        host.map((hostItem)=>{
          if (todayFormated >= hostItem.checkin && todayFormated <= hostItem.checkout) {
            if (hostItem.isChecked == false) {
              room.status = 'orange' // room reserved
            }else{
              room.status = 'red' // room busy
            }
          }
        });
      });
    }
  },

  created(){
    this.loadRoomList(this.collection);
  }
}
</script>

<style lang="css" scoped="true">
.headline{
  width: 100%;
}

.label{
  display: inline-block;
  margin-bottom: 2px;
}

.pointer{
  cursor: pointer;
}
.pointer:hover{
  box-shadow: 0 0  4px 3px rgba(0,0,0,0.6);
}

.grid-container{
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  height: 100%;
}

.full-height{
  height: 100% !important;
}
</style>
