import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import App from './App'
import router from './router'
import store from './store'

//  UI
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

//Database
import {database} from './connection';


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
const MyApp = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
