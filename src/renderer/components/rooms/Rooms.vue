<template lang="html">
  <div class="">

    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <a href="#addRoom" class="btn btn-success" @click="btnAddRoom">Adicionar quarto</a>
      </div>
    </div>

    <create-room v-if="showForm" @updateList="updateRoomsList" @cancel="btnAddRoom"></create-room>

    <div class="row mt-4">
      <div class="col col-12 alert alert-secondary">
          <p>Realizar uma busca:</p>
          <input type="text" class="form-control" placeholder="Filtrar lista" v-model="filterTerm">
      </div>
    </div>

    <section class="row mt-4">
      <table class="table">
        <thead>
          <tr>
            <th width="50"><a href="#" @click="sort($event,'$loki')">#</a></th>
            <th width="50"><a href="#" @click="sort($event,'number')">Número</a></th>
            <th><a href="#" @click="sort($event,'dailyPrice')">Diária</a></th>
            <th width="200">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(room, index) in list">
            <td>{{room.$loki}}</td>
            <td>{{room.number}}</td>
            <td>{{room.dailyPrice}}</td>
            <td>
              <a href="#" class="btn btn-primary">Edit</a>
              <a href="#" @click="removeRoom(index,room)" class="btn btn-danger">Deletar</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
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
      roomCollection: database().getCollection("rooms"),
      rooms:[],
      showForm: false,
      sortProperty: "id",
      sortDirection: "desc",
      filterTerm: "",
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
      this.showRoomList();
      console.log("Updated product list");
    },

    /*
    * Load items from database and show table
    */
    showRoomList(){
      this.rooms = this.roomCollection.chain().simplesort('number').data();
      console.log("Lista de produtos");
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
    removeRoom(index,object){
      //remove item from list
      this.rooms.splice(index,1);
      console.log("Item removed from list");

      // remove item from database
      let result = this.roomCollection.findOne({
        '$loki': parseInt(object.$loki)
      });
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

    this.showRoomList();

  },
}
</script>

<style lang="css">
</style>
