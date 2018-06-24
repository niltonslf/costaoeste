<template lang="html">
  <v-layout row wrap>

    <v-flex xs12>
      <v-btn color="info" @click="btnAddRoom">Adicionar quarto</v-btn>
    </v-flex>

    <v-flex xs12>
      <create-room v-if="showForm" @updateList="updateRoomsList" @cancel="btnAddRoom"></create-room>
    </v-flex>


    <v-flex xs12>
      <v-text-field  v-model="filterTerm" :counter="200"  label="Realizar uma busca:"></v-text-field>

      <v-data-table
      :headers="headers"
      :items="rooms"
      hide-actions
      class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.$loki }}</td>
        <td class="text-xs-left">{{ props.item.number }}</td>
        <td class="text-xs-left">{{ props.item.dailyPrice }}</td>
        <td class="text-xs-left">
          <v-btn icon class="mx-0" @click="editRoom(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="removeRoom(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-flex>

</v-layout>
</template>

<script>
import _ from "lodash";

import {database} from '../../connection'
import CreateRoom from './addRoom'

export default {

  components:{
    CreateRoom
  },

  data(){
    return{
      roomCollection: database().rooms,
      rooms:[],
      showForm: false,
      sortProperty: "id",
      sortDirection: "desc",
      filterTerm: "",

      headers: [
        { text: '#', value: '$loki',  align: 'center',width: "50"},
        { text: 'Quarto', value: 'room', sortable: true,},
        { text: 'Preço diára', value: 'dailyPrice',width: "130"},
        { text: 'Ações', value: 'action' , sortable: false, align:'center', width: "130"},
      ],
    }
  },

  methods: {
    /*
    *  sort item list
    */
    sort(event,property){
      event.preventDefault();
      this.sortProperty = property;

      if (this.sortDirection == "asc") {
        this.sortDirection = "desc";
      } else {
        this.sortDirection = "asc";
      }
    },
    /*
    * update list of rooms
    */
    updateRoomsList(data){
      this.loadRoomList();
      console.log("Updated room list");
    },

    /*
    * Load items from database and show table
    */
    loadRoomList(){
      this.rooms = this.roomCollection.chain().simplesort('number').data();
      console.log("Room list");
      console.log(this.rooms);
    },
    /**
    * Button to show or hide add room form
    */
    btnAddRoom(){
      this.showForm = (this.showForm ? false :true);
    },

    /*
    * Remove room from list and database
    */
    removeRoom(object){
      // remove item from database
      let result = this.roomCollection.findOne({
        '$loki': parseInt(object.$loki)
      });

      //Remove item from array
      this.rooms.splice(this.rooms.indexOf(object),1);
      this.roomCollection.remove(result);
      console.log("Item removed from database:");
    }

  },

  computed:{
    /**
    * Return data sorted and filtered
    */
    list() {
      const filter = this.filterTerm;
      const list = _.orderBy(this.rooms, this.sortProperty, this.sortDirection);

      if (_.isEmpty(filter)) {
        return list;
      }

      return _.filter(
        list,
        room => room.number.toLowerCase().indexOf(filter) >= 0
      );
    }
  },

  created(){

    this.loadRoomList();

  },
}
</script>

<style lang="css">
</style>
