/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:09
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-15 09:44:58
 * @message:
 * @FilePath: \supply-chain-system\src\main.js
 */

import Vue from 'vue';
import { errorHandler } from '@/utils/errorLog.ts';

// 注册表格插件
import 'xe-utils';
import registerTableComponent from '@/pligins/table/index.js';

registerTableComponent( Vue );
errorHandler( Vue );
import { reload } from '@/directives/index.ts';

Vue.use( reload() );

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

export default new Vue( {
  store,
  router,
  el: '#app',
  render: ( h ) => h( App )
} );
