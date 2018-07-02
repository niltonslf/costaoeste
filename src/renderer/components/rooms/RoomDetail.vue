<template lang="html">

  <v-layout row wrap>
    <v-flex xs4>
      <v-card>
        <v-card-media
        class="white--text"
        height="150px"
        src="/src/renderer/assets/room.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs11 align-end flexbox>
              <span class="display-1">Quarto {{room.number}}</span>
            </v-flex>
            <v-flex>
              <v-btn icon class="mx-0 white" @click="removeRoom(room)">
                <v-icon color="black">delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-title>

        <v-flex xs12>
          <v-list two-line subheader >
            <v-subheader>Informações do quarto</v-subheader>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">attach_money</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Preço dia</v-list-tile-title>
                <v-list-tile-sub-title>{{room.dailyPrice}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">today</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Status</v-list-tile-title>
                <v-list-tile-sub-title>{{room.status}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

        </v-flex>

      </v-card-title>
    </v-card>
  </v-flex>

  <v-flex xs8 >
    <reserve-add :object="room"  @updateList="updateList"></reserve-add>
  </v-flex>

  <v-flex xs12 mt-4>
    <reserve-list ref="list" :roomId="room.$loki"></reserve-list>
  </v-flex>

</v-layout>

</template>

<script>
import {database} from '../../connection'
import  ReserveList from '../reservations/ReserveList.vue'
import  ReserveAdd from '../reservations/ReserveAdd.vue'

export default {

  components:{
    ReserveList,
    ReserveAdd
  },

  data(){
    return{
      collection: database().rooms,
      roomId: this.$router.props.roomId,
      room:{},
    }
  },
  methods:{
    updateList(){
      this.$refs.list.loadData(); // reload location list
    },

    /*
    * Remove room from list and database
    */
    removeRoom(object){
      // remove item from database
      let result = this.collection.findOne({
        '$loki': parseInt(object.$loki)
      });

      if (result) {
        //Remove item from database
        this.collection.remove(result);
        // Redirect to  home page
        this.$router.push('/');
        // DEBUG:
        console.log("Item removed from database:");

      }
    }

  },
  created(){
    try {
      /*
      * Load room from database
      */
      this.room = this.collection.findOne({'$loki': this.roomId});
      // DEBUG:
      console.log("Room loaded");
      console.log(this.room);
    } catch (e) {
      this.$router.push({name:'home'});
    }

  }
}
</script>

<style lang="css">
</style>
