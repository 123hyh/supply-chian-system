/*
 * @Author: your name
 * @Date: 2020-07-07 21:18:50
 * @lastTime: 2020-07-14 10:32:20
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\router\index.ts
 */

import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
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
    component: () =>
      import(
        /* webpackChunkName: "HomeContainer" */ '@/view/Home/HomeContainer.vue'
      ),
    children: [
      {
        path: '',
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
export default new Router( { routes } );

const obj = {
  getData() {
    return this;
  },
  postMsg() {
    return this;
  }
};
obj.getData().postMsg();
