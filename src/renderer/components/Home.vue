<template>
	<v-layout row wrap class="full-height">

		<toolbar>
			<div slot="app-picker">

				<v-menu
				ref="pickerStatus"
				:close-on-content-click="false"
				v-model="pickerStatus"
				:nudge-right="40"
				:return-value.sync="filterDate"
				lazy
				transition="scale-transition"
				offset-y
				full-width
				min-width="290px">
				<v-text-field
				slot="activator"
				v-model="dateFormatted"
				prepend-icon="event"
				readonly></v-text-field>
				<v-date-picker v-model="filterDate" no-title  @input="$refs.pickerStatus.save(filterDate)"></v-date-picker>

			</v-menu>

		</div>
	</toolbar>

	<div class="grid-container">
		<div class="grid-item" v-for="room in rooms">
			<v-card :color="(room.status == 'vacant' ? 'green' : room.status) +' darken-2'"
			class="pointer full-height white--text" @click.native="gotoPage('room',room.$loki)">
			<v-card-title primary-title>
				<h1 class="headline">
					Quarto: {{room.number}}
				</h1>
				<span class="label w-100" >
					<v-icon small>people</v-icon>
					<span v-if="room.hostData.guest">
						Hóspede: <b>{{room.hostData.guest.name}}</b>
					</span>
					<span v-else>
						Hóspede: <b>Sem hóspede</b>
					</span>
				</span>


				<span class="label w-100" >
					<v-icon small>today</v-icon>
					<span v-if="room.hostData.checkin">
						Checkin: {{formatDate(room.hostData.checkin)}}
					</span>
					<span v-else>
						Checkin: <b>00/00/0000</b>
					</span>
				</span><br>
				<span class="label w-100" >
					<v-icon small>today</v-icon>
					<span v-if="room.hostData.checkout">
						Checkout: {{formatDate(room.hostData.checkout)}}
					</span>
					<span v-else>
						Checkout: <b>00/00/0000</b>
					</span>
				</span>
			</v-card-title>
		</v-card>
	</div>
</div>

<v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
	<v-icon class="fix-icon">add</v-icon>
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
import {database} from '../connection'
import CreateRoom from './rooms/addRoom'
import Toolbar from './shared/toolbar/Toolbar'
import moment from 'moment'

export default{
	components:{
		CreateRoom,
		Toolbar,
	},

	data(){
		return{
			//Data picker
			pickerStatus: false,
			filterDate: null,
			dateFormatted: null,

			dialog: false,
			collection:database().rooms,
			hostsCollection:database().hosts,
			rooms:[],
			hosts:[],
		}
	},

	watch:{
		filterDate (val) {
			this.loadRoomList();
			this.dateFormatted = this.formatDate(this.filterDate);
		}
	},

	methods:{
		formatDate (date) {
			if (!date) return null
			return moment(date).format('DD/MM/YYYY');
		},

		gotoPage(routerName,roomId){
			this.$router.props={roomId: roomId};
			this.$router.replace(routerName);
		},
		/*
		* Load items from database and show table
		*/
		loadRoomList(){
			this.rooms = this.collection.chain().simplesort('number').data();;
			this.checkRoomStatus();
		},
		/*
		*	Find host by room id
		**/
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
			this.rooms.map((room) => { //goes through the array of rooms comparing the hosts with that same room
				let host = this.findHost(room.$loki); // select the host that contains the room id in atributes

				room.status = 'green'; // reset room status
				room.hostData = {}; //  no guest
				host.map((hostItem)=>{
					if (this.filterDate >= hostItem.checkin && this.filterDate <= hostItem.checkout) {
						if (hostItem.isChecked == false) {
							room.status = 'orange' // room reserved
						}else if(hostItem.isChecked == true){
							room.status = 'red' // room busy
						}
						// load room client data
						room.hostData = hostItem;
					}
				}); // end host map
			});// end rooms map
		}, // end check room status

	}, // end methods

	created(){
		this.filterDate = moment().format('YYYY-MM-DD');
		this.dateFormatted = moment().format('DD/MM/YYYY');
		this.loadRoomList();
	}
}
</script>
<style lang="css" scoped="true">
.headline{
	width: 100%;
}

.label{
	display: block;
	width: 100%;
	margin-top: 2px;
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

.fix-icon{
	margin-top: 25px;
}
</style>
