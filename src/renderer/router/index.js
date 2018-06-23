import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/location',
      name:'location',
      component: require('@/components/location/Location').default
    },
    {
      path: '/rooms',
      name:'rooms',
      component: require('@/components/rooms/Rooms').default
    },
  ]
})
