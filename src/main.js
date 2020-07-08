/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:09
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 10:53:21
 * @message:
 * @FilePath: \supply-chain-cli\src\main.js
 */

import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

export default new Vue( {
  store,
  router,
  el: '#app',
  render: ( h ) => h( App )
} );
