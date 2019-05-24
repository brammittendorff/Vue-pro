import Vue from 'vue'
import Router from 'vue-router'
import echarts from '@/module/HelloWorld'
import Login from '@/module/login/login'
import vuex from '@/module/vuex_demo/vuex'
  //主页
import home from '../components/base_m/Home'
import homelist from '@/module/home/index'

  //数据
import data from '@/module/data/data' //设置
// import dataanalysis from '@/module/data/dataanalysis/DataAnalysis.vue' //数据分析
// import admaster from '@/module/data/dataanalysis/module/admaster.vue' //数据分析广告主
// import mediamaster from '@/module/data/dataanalysis/module/mediamaster.vue' //数据分析媒体主
import Monthly from '@/module/data/Monthly/index' //月报
import pre_month from '@/module/data/module/per_month' //业绩月报
        //设置
import set from '@/module/set/set' //设置
import user_con from '@/module/set/module/user_con' //用户管理
import organization from '@/module/set/module/organization'  //组织架构
import pre_set from '@/module/set/module/pre_set'  //权限配置
import operate_set from '@/module/set/module/operate_set' //操作权限
import exit_branch from '@/module/set/module/exit_branch' //编辑部门


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path:'/home',
      component:home,
      redirect:'/home/homelist',
      children:[
        {
          path:'homelist',
          component:homelist
        }
      ]
    },
    // 设置
    {
      path:'/set',
      component:set,
      redirect: '/set/user_con',
      children: [
          {
              path: 'user_con',
              component: user_con,
          },
          {
              path: 'organization',
              component: organization,
              // redirect:'/set/orgaization/org_list',
              // children:[
              //     {
              //         path:'org_list',
              //         component:org_list
              //     }
              // ]
          },
          {
              path: 'pre_set',
              component: pre_set,
              redirect:'/set/pre_set/operate_set',
              children:[
                  {
                      path:'operate_set',
                      component:operate_set
                  },
              ]
          },
          {
              path: 'exit_branch',
              component: exit_branch,
          },
      ]
  },
    // 数据
    {
      path:'/data',
      component:data,
      redirect: '/data/monthly',
      children: [
          {
            path: 'monthly',
            component: Monthly,
            redirect: '/data/monthly/pre_month',
            children:[
                {
                    path:'pre_month',
                    component:pre_month
                }
            ]
        },
          // {
          //     path: 'dataanalysis',
          //     component: dataanalysis,
          //     redirect: '/data/dataanalysis/admaster',
          //     children: [{
          //             path: 'admaster',
          //             component: admaster
          //             },
          //             {
          //                 path: 'mediamaster',
          //                 component: mediamaster
          //             }
          //         ]
          // }
      ]
  },
    {
      path: '/echarts',
      component: echarts
    },
    {
      path: '/vuex',
      component: vuex
    }

  ]
})
