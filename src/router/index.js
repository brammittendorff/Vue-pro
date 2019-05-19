import Vue from 'vue'
import Router from 'vue-router'
import echarts from '@/module/HelloWorld'
import Login from '@/module/login/login'
import vuex from '@/module/vuex_demo/vuex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: echarts
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: vuex
    }

  ]
})
