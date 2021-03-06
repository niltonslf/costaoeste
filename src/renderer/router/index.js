import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/Login').default,
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/Home').default,
    },
		{
      path: '/room',
      name:'room',
      component: require('@/components/rooms/RoomDetail').default
    },
		{
      path: '/reports',
      name:'reports',
      component: require('@/components/reports/Report').default,
			children:[
				{
					path: '/hosts',
					component: require('@/components/reports/ReportHosts').default,
				},
				{
					path: '/revenue',
					component: require('@/components/reports/ReportRevenue').default,
				},
				{
					path: '/consumption',
					component: require('@/components/reports/ReportConsumptions').default,
				},
			],
    },
  ]
})
