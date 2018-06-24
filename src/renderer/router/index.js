import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default,
      meta:{
        reload: false
      },
    },
    {
      path: '/room',
      name:'room',
      component: require('@/components/rooms/RoomDetail').default
    },
  ]
})
