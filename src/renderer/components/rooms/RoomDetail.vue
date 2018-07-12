<template lang="html">

	<v-layout row wrap>
		<toolbar></toolbar>

		<v-flex xs3>
			<v-card  :color="room.status">
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
					<v-list two-line subheader>
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
								<v-list-tile-title>Status de hoje</v-list-tile-title>
								<v-list-tile-sub-title>{{(room.status == 'orange'? 'Reservado' : (room.status == 'red' ? 'Ocupado' : 'Livre'))}}</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>

				</v-flex>

			</v-card-title>
		</v-card>
	</v-flex>

	<v-flex xs9 pl-4>
		<hosts-list ref="list" :roomId="room.$loki"></hosts-list>
	</v-flex>

	<hosts-add :object="room"  @updateList="updateList"></hosts-add>
</v-layout>

</template>

<script>
import {database} from '../../connection'
import moment from 'moment'
import  HostsList from '../hosts/HostsList.vue'
import  HostsAdd from '../hosts/HostsAdd.vue'
import Toolbar from '../shared/toolbar/Toolbar'


export default {

	components:{
		HostsList,
		HostsAdd,
		Toolbar,
	}, // end components

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
			this.checkRoomStatus();
		},

		/*
		* Remove room from list and database
		*/
		removeRoom(object){
			this.eraseHosts(object.$loki); // remove hosts related with room
			// remove item from database
			let result = this.collection.findOne({
				'$loki': parseInt(object.$loki)
			});

			if (result) {
				//Remove item from database
				this.collection.remove(result);
				// Redirect to  home page
				this.$router.push('/');
			}
		},
		/*
		*	Remove all hosts related with room
		*/
		eraseHosts(roomId){
			let result = database().hosts.find({'roomId': roomId});
			result.map(function(elem){
				database().hosts.remove(elem);
			});
		},

		/*
		*  Find a host with roomId
		*/
		findHost(roomId){
			return this.hostsCollection.find({'roomId': roomId});
		},

		/*
		* Verifiy if room is busy, reserved or free
		*/

		checkRoomStatus(){
			let today = moment().format('YYYY-MM-DD'); // date being verified
				let host = this.findHost(this.room.$loki); // select the host that contains the room id in atributes
				this.room.status = 'green'; // reset room status
				host.map((hostItem)=>{
					if (today >= hostItem.checkin && today <= hostItem.checkout) {
						if (hostItem.isChecked == false) {
							this.room.status = 'orange' // room reserved
						}else if(hostItem.isChecked == true){
							this.room.status = 'red' // room busy
						}
					}
				}); // end host map
		}, // end check room status
	},
	created(){
		try {
			/* Load room from database */
			this.room = this.collection.findOne({'$loki': this.roomId});
		} catch (e) {
			this.$router.push('home');
		}
	}
}
</script>

<style lang="css">
</style>
