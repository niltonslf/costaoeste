<template lang="html">
	<v-layout column wrap>
		<v-subheader class="title">Histórico</v-subheader>
		<v-card>
			<v-list two-line v-for="host in hosts">
				<v-list-tile @click="editHosting(host)">
					<v-list-tile-action>
						<v-icon :color="host.color">hotel</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>

						<v-list-tile-title>{{host.guest.name}}</v-list-tile-title>

						<v-list-tile-sub-title>
							<v-icon :color="host.color" small>phone</v-icon>
							{{host.guest.tel}}
						</v-list-tile-sub-title>

					</v-list-tile-content>

					<v-list-tile-action>
						<v-chip :color="`${host.color} lighten-4`" label small class="ml-0">
							<v-icon small>today</v-icon>
							Check-in:<b> {{ formatDate(host.checkin) }}</b>
						</v-chip>
					</v-list-tile-action>

					<v-list-tile-action>
						<v-chip :color="`${host.color} lighten-4`" label small class="ml-0">
							<v-icon small>today</v-icon>
							Checkout:<b> {{ formatDate(host.checkout) }}</b>
						</v-chip>
					</v-list-tile-action>

					<v-list-tile-action>
						<v-btn icon color="red" class="mx-0" @click="removeHost(host)">
							<v-icon color="white">delete</v-icon>
						</v-btn>
					</v-list-tile-action>

				</v-list-tile>

				<v-divider></v-divider>
			</v-list>

			<!-- Empty location list -->
			<v-list two-line v-if="hosts == false">
				<v-list-tile>
					<v-list-tile-action>
						<v-icon color="blue">error</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Sem reservas para quarto.</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>

		</v-card>

		<hosts-edit :modal="editHost" :host="hostObject"
		@modalClosed="manageModal"></hosts-edit>
	</v-layout>

</template>

<script>
import {database} from '../../connection'
import moment from 'moment'
import  HostsEdit from '../hosts/HostsEdit.vue'

export default {
	components:{
		HostsEdit,
	}, // end components

	props:['roomId'],
	data(){
		return{
			collection: database().hosts,
			hosts:[],
			editHost:false,
			hostObject:null,

			checkoutFormated: null,
			checkinFormated: null,
		}
	},
	methods:{
		formatDate (date) {
			if (!date) return null
			return moment(date).format('DD/MM/YYYY');
		},
		/*
		* Load items from database and show table
		*/
		loadData(){
			this.hosts = this.collection.chain().find({'roomId': this.roomId}).simplesort('$loki',true).limit(20).data();
		},
		/*
		* Open and close modal
		*/
		manageModal(){
			this.editHost = this.editHost ? false : true;
		},
		/*
		* Edit host
		*/
		editHosting(object){
			this.manageModal();
			this.hostObject = object;
		},

		/*
		* Remove room from list and database
		*/
		removeHost(object){
			// find from database
			let result = this.collection.findOne({
				'$loki': parseInt(object.$loki)
			});
			// remove item from database
			this.collection.remove(result);
			//Remove item from array
			this.hosts.splice(this.hosts.indexOf(object),1);
		},
		/*
		*  Find a host with roomId
		*/
		findHost(roomId){
			return this.collection.find({'roomId': roomId});
		},
		/*
		* Verifiy if room is busy, reserved or free
		*/
		checkRoomStatus(){
			let today = new Date().toLocaleDateString('en-GB'); // date being verified
			let date = today.split('/');
			let todayFormated = date[2]+"-"+date[1]+"-"+date[0];
			let host = this.findHost(this.roomId); // select the room that contains the id in host
			host.map((hostItem)=>{
				if (todayFormated >= hostItem.checkin && todayFormated <= hostItem.checkout) {
					if (hostItem.isChecked == false) {
						hostItem.color = 'orange' // room reserved
					}else{
						hostItem.color = 'red' // room busy
					}
				}
			});
		},
	}, // end methods
	created(){
		this.loadData();
		this.checkRoomStatus();
	}, // end created
}
</script>

<style lang="css">
</style>
