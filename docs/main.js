/*
 * @Author: your name
 * @Date: 2020-08-01 15:35:37
 * @LastEditTime: 2020-08-01 16:03:22
 * @LastEditors: Please set LastEditors
 * @Description: 开发文档
 * @FilePath: /supply-chian-system/docs/index.js
 */
import Vue from 'vue';
import router from '@docs/router';
import App from '@docs/app.js';
new Vue( {
  el: '#app',
  router,
  render: h => h( App )
} );