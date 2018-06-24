<template lang="html">
  <v-layout column wrap>
    <v-subheader class="title">Reservas</v-subheader>



    <v-card>
      <v-list two-line v-for="location in locations">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="blue">hotel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>

            <v-list-tile-title>{{location.guest.name}}</v-list-tile-title>

            <v-list-tile-sub-title>
              <v-icon color="blue" small>phone</v-icon>
              {{location.guest.tel}}
            </v-list-tile-sub-title>

          </v-list-tile-content>

          <v-list-tile-action>
            <v-chip color="blue lighten-4" label small class="ml-0">
              <v-icon small>today</v-icon>
              Check-in:<b> {{ location.checkinDate }}</b>
            </v-chip>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-chip color="blue lighten-4" label small class="ml-0">
              <v-icon small>today</v-icon>
              Checkout:<b> {{ location.checkoutDate }}</b>
            </v-chip>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn icon class="mx-0" @click="editRoom(location)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn icon class="mx-0" @click="removeRoom(location)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>
      </v-list>


    </v-card>


  </v-layout>

</template>

<script>
import {database} from '../../connection'

export default {
  data(){
    return{
      collection: database().location,
      locations:[],
      messages: [],
    }
  },
  methods:{
    /*
    * Load items from database and show table
    */
    loadData(){
      this.locations = this.collection.chain().simplesort('$loki',true).data();
      console.log("Locations list");
      console.log(this.locations);
    },
    /*
    * Remove room from list and database
    */
    removeRoom(object){
      // find from database
      let result = this.collection.findOne({
        '$loki': parseInt(object.$loki)
      });
      // remove item from database
      this.collection.remove(result);

      //Remove item from array
      this.locations.splice(this.locations.indexOf(object),1);
      console.log("Item removed from database:");
    }
  },
  created(){
    this.loadData();
  }
}
</script>

<style lang="css">
</style>
