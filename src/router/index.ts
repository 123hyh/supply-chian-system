/*
 * @Author: your name
 * @Date: 2020-07-07 21:18:50
 * @lastTime: 2020-07-08 17:41:31
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-cli\src\router\index.ts
 */

import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
Vue.use( Router );
import Login from '@/view/Login.vue';
const routes: Array<RouteConfig> = [
  {
    path: '',
    component: Login
  },
  {
    path: '/Home',
    component: () =>
      import( /* webpackChunkName: "view/Home" */ '@/view/Home/HomeContainer.vue' )
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
obj
  .getData()
  .postMsg();