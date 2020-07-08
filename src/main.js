/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:09
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 10:53:21
 * @message:
 * @FilePath: \supply-chain-cli\src\main.js
 */

import Vue from 'vue';
// 注册表格插件
import 'xe-utils';
import registerTableComponent from '@/pligins/table/index.js';
registerTableComponent( Vue );

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';



export default new Vue( {
  store,
  router,
  el: '#app',
  render: ( h ) => h( App )
} );
