import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';
Vue.prototype.$moment = moment;
window.axios = require("axios");
window.apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
