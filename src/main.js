import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/index'
import axios from '@/components/tooltip/Http.js'
import ElementUI from 'element-ui'
import './assets/less/reset.less';
import './assets/less/global.less';
import './assets/less/lib/index.less';
import filters from './components/util/filters'

Object.keys(filters).forEach(key => {
  console.log(filters,key,filters[key],'/././.....')
Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.timeout = 100000
Vue.prototype.$axios = axios

// router.beforeEach((to, from, next) => {
//   console.log(localStorage.getItem('Login_token'))
//   if (to.fullPath == "/inquirydetail/inquirydetail/inquirydetailchild2") {
//     next("/inquirydetail/inquirydetailchild2")
//   }
//   next()
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
