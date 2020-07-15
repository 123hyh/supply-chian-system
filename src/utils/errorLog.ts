/*
 * @Author: your name
 * @Date: 2020-07-09 23:43:39
 * @LastEditTime: 2020-07-09 23:46:45
 * @LastEditors: Please set LastEditors
 * @Description: 捕抓错误日志
 * @FilePath: /supply-chian-system/src/utils/errorLog.ts
 */ 
const isDev = process.env.NODE_ENV  ===  'development';
import { VueConstructor } from 'vue';

function errHandler ( ...args: any[] ) {
  const [ err, vm, info ] = args;
  if ( !isDev ) {
    console.log( err.message, err.stack, '\n', vm, '\n', info );
  }

/**
 * 全局捕抓 Vue 错误 log
 * @description: 
 * @param {type} 
 * @return: 
 */  
}
export function errorHandler ( Vue: VueConstructor ) {
  Vue.config.errorHandler = errHandler;
  Vue.prototype.$throw = ( ...args: any[] ) => errHandler( ...args );
}

function handlerDb () {
  const db = window.indexedDB.open( 'errorLog' );
  db.onerror = function ( e ) {
    console.log( '数据库打开失败' );
  };
}
