<template>
	<v-layout row wrap class="full-height">
		<toolbar>
			<span slot="app-title">Relatórios</span>
			<div slot="app-picker">
				<v-menu
				ref="pickerStatus"
				:close-on-content-click="false" v-model="pickerStatus" :nudge-right="40" :return-value.sync="filterDate"
				lazy transition="scale-transition" offset-y	full-width min-width="290px">
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

		<div class="grid-item">
			<v-card color="purple full-height darken-2"class="pointer white--text" @click.native="showHostReport">
				<v-card-title primary-title>
					<h1 class="report-value display-2">32</h1>
					<span class="headline w-100">Hospedagens</span>
				</v-card-title>
			</v-card>
		</div>

		<div class="grid-item">
			<v-card color="pink full-height darken-2"class="pointer white--text" @click.native="showConsumptionReport">
				<v-card-title primary-title>
					<h1 class="report-value display-2">150</h1>
					<span class="headline w-100">Produtos consumidos</span>
				</v-card-title>
			</v-card>
		</div>

		<div class="grid-item">
			<v-card color="green full-height darken-2"class="pointer white--text" @click.native="showRevenueReport">
				<v-card-title primary-title>
					<h1 class="report-value display-2">1200,00 R$</h1>
					<span class="headline w-100">Receita no período</span>
				</v-card-title>
			</v-card>
		</div>

	</div>
	<report-hosts :dialog="hostDialog" @closeHostDialog="showHostReport"></report-hosts>
	<report-consumptions :dialog="consumptionDialog" @closeHostDialog="showConsumptionReport"></report-consumptions>
	<report-revenue :dialog="revenueDialog" @closeHostDialog="showRevenueReport"></report-revenue>
</v-layout>

</template>

<script>
import {database} from '../../connection'
import moment from 'moment'
import Toolbar from '../shared/toolbar/Toolbar'
import ReportHosts from './ReportHosts'
import ReportConsumptions from './ReportConsumptions'
import ReportRevenue from './ReportRevenue'


export default{
	components:{
		Toolbar,
		ReportHosts,
		ReportConsumptions,
		ReportRevenue
	},

	data(){
		return{
			//Data picker
			pickerStatus: false,
			filterDate: null,
			dateFormatted: null,

			//Reports
			hostDialog: false,
			consumptionDialog: false,
			revenueDialog:false,
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
		*  show report
		*/
		showHostReport(){
			this.hostDialog = (this.hostDialog ? false : true);
		},
		/*
		*  show report
		*/
		showConsumptionReport(){
			this.consumptionDialog = (this.consumptionDialog ? false : true);
		},
		/*
		*  show report
		*/
		showRevenueReport(){
			this.revenueDialog = (this.revenueDialog ? false : true);
		},
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
	grid-template-columns: 31.5vw 31.5vw 31.5vw;
	grid-column-gap: 1vw;
	grid-row-gap: 1vw;
	height: 100%;
}

.grid-item .card{
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: flex-start;
	width: 100%;
}

.report-value{
	height: 60px;
}

.full-height{
	height: 150px !important;
}

.fix-icon{
	margin-top: 25px;
}
</style>
