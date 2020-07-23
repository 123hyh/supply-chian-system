/*
 * @Author: your name
 * @Date: 2020-07-07 21:18:50
 * @lastTime: 2020-07-23 11:40:18
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\router\index.ts
 */

import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { registerRouterHooks } from './hooks';
Vue.use( Router );

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: () =>
      import( /* webpackChunkName: "Login" */ '@/view/Login.vue' )
  },
  {
    alias: '',
    path: '/Home',
    meta:{
      title:''
    },
    component: () =>
      import(
        /* webpackChunkName: "HomeContainer" */ '@/view/Home/HomeContainer.vue'
      ),
    children: [
      {
        path: '',
        meta:{
          title:'首页'
        },
        component: () =>
          import(
            /* webpackChunkName: "Home" */ '@/view/Home/children/Home.vue'
          )
      },
      {
        path: 'refresh',
        component: () =>
          import(
            /* webpackChunkName: "Refresh" */ '@/view/Home/children/Refresh.vue'
          )
      }
    ]
  }
];
const routerInstance =  new Router( { routes } );
export default routerInstance;
registerRouterHooks( routerInstance );
