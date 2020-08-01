/*
 * @Author: your name
 * @Date: 2020-08-01 15:46:59
 * @LastEditTime: 2020-08-01 16:01:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/docs/src/index.js
 */ 
import Vue from 'vue';
import VueRouter from 'vue-router';
import Box from '@docs/view/index.js';
Vue.use( VueRouter );
export default new VueRouter( {
  routes:[
    {
      path: '/',
      component: Box
    }
  ]
} );