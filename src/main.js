/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:09
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-15 10:16:15
 * @message:
 * @FilePath: \supply-chain-system\src\main.js
 */

import Vue from 'vue';
import { errorHandler } from '@/utils/errorLog.ts';

/* 注册表格插件 */
import 'xe-utils';

/* 添加 错误处理 */
import registerTableComponent from '@/pligins/table/index.js';
registerTableComponent( Vue );
errorHandler( Vue );

/* 注册 刷新路由指令 */
import { reload } from '@/directives/index.ts';
Vue.use( reload() );

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

new Vue( {
  store,
  router,
  el: '#app',
  render: ( h ) => h( App )
} );
