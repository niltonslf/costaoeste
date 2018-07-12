<template>
	<v-layout>
		<v-card>
			<v-card-title	class="headline grey lighten-2" primary-title>
				Relatório de hospedagem
			</v-card-title>

			<v-subheader class="title">Selecione um quarto</v-subheader>

			<v-layout row wrap pa-2>
				<div class="grid-room">
					<v-btn color="blue" class="grid-item" v-for="room in rooms" dark @click="reportHost(room.$loki)">{{room.number}}</v-btn>
				</div>
				<v-flex xs12>
					<v-text-field  v-model="filterTerm" :counter="200"  label="Buscar por um hóspede"></v-text-field>
				</v-flex>
				<v-flex xs12>
					<v-data-table
					:headers="headers"
					:items="list"
					hide-actions
					class="elevation-1">
					<template slot="items" slot-scope="props">
						<td class="text-xs-center">{{ props.item.roomId }}</td>
						<td class="text-xs-left">{{ props.item.guest.name }}</td>
						<td class="text-xs-center">{{formatDate(props.item.checkin)}}</td>
						<td class="text-xs-center">{{formatDate(props.item.checkout)}}</td>
						<td class="text-xs-center">{{props.item.totalPrice }}</td>
						<td class="text-xs-center">
							<v-btn icon class="mx-0" @click="seeHost(props.item)">
								<v-icon color="teal">remove_red_eye</v-icon>
							</v-btn>
						</td>
					</template>
				</v-data-table>
			</v-flex>
		</v-layout>

		<v-divider></v-divider>

	</v-card>
	<hosts-edit :modal="editHost" :host="hostObject"
	@modalClosed="manageModal"></hosts-edit>
</v-layout>
</template>

<script>
import _ from "lodash";
import {database} from '../../connection'
import moment from 'moment'
import  HostsEdit from '../hosts/HostsEdit.vue'

export default {
	props:['dialog','startDate','endDate'],
	components:{
		HostsEdit,
	}, // end components
	data(){
		return{
			roomCollection: database().rooms,
			//Search
			sortProperty: "id",
			sortDirection: "desc",
			filterTerm: "",
			//Table
			headers: [
				{ text: 'Quarto', value: 'room', width:50},
				{ text: 'Hóspede', value: 'guestName'},
				{ text: 'Checkin', value: 'Checkin' , align:'center'},
				{ text: 'Checkout', value: 'Checkout' ,  align:'center'},
				{ text: 'Preço total', value: 'totaPrice' ,  align:'center'},
				{ text: 'Ações', sortable: false, align:'center'},
			],
			//rooms
			rooms:[],
			hosts:[],
			editHost:false,
			hostObject:null,
		}
	},

	methods:{
		formatDate (date) {
			if (!date) return null
			return moment(date).format('DD/MM/YYYY');
		},
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
		*	 show host details
		*/
		seeHost(object){
			this.manageModal();
			this.hostObject = object;

		},
		/*
		* Open and close modal
		*/
		manageModal(){
			this.editHost = this.editHost ? false : true;
		},
		/*
		*	 Show room report
		*/
		reportHost(roomId){
			let startDate = this.startDate;
			let endDate = this.endDate;
			this.hosts = database().hosts.where(function(obj){
				return (obj.roomId == roomId && obj.checkin >= startDate  && obj.checkout <= endDate);
			});

		},
		/*
		* Load items from database and show table
		*/
		loadRoomList(roomId){
			this.rooms = database().rooms.chain().simplesort('number').data();
		},
		/*
		* Close modal
		*/
		close(){
			this.$emit('closeHostDialog');
		}
	}, // end methods
	computed:{
		/**
		* Return data sorted and filtered
		*/
		list() {
			const filter = this.filterTerm;
			const list = _.orderBy(this.hosts, this.sortProperty, this.sortDirection);

			if (_.isEmpty(filter)) {
				return list;
			}

			return _.filter(
				list,
				host => host.guest.name.toLowerCase().indexOf(filter) >= 0
			);
		}
	},
	created(){
		this.loadRoomList();
	}
}
</script>

<style lang="css">
.grid-room{
	width: 100%;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 12.2% 12.2% 12.2% 12.2% 12.2% 12.2% 12.2% 12.2%;
	grid-column-gap: 2px;
}

.grid-item{
}
</style>
