import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/style/all.css'
import axios from 'axios'
// 解决每次ajax请求，对应的sessionId不一致的问题
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
