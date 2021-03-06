/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:09
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-08-04 15:55:17
 * @message:
 * @FilePath: \supply-chain-system\src\main.js
 */

/* 加载bar */
import { progressBar } from './router/hooks';
progressBar.start();

import Vue from 'vue';
import { errorHandler } from '@/utils/errorLog.ts';

/* 注册表格插件 */
import 'xe-utils';

/* 添加 错误处理 */
import registerTableComponent from '@/plugins/table/index.js';
registerTableComponent( Vue );
errorHandler( Vue );

/* 注册 刷新路由指令 */
import { reload } from '@/directives/index.ts';
Vue.use( reload() );

import { loadingDirective } from './plugins/loadding';
Vue.use( loadingDirective );

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

new Vue( {
  store,
  router,
  el: '#app',
  render: ( h ) => h( App )
} );
