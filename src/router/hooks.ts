/*
 * @Author: your name
 * @Date: 2020-07-07 21:19:34
 * @lastTime: 2020-07-08 17:40:07
 * @LastAuthor: huangyuhui
 * @Description: 路由钩子
 * @FilePath: \supply-chain-cli\src\router\hooks.ts
 */

import QProgress from 'qier-progress';

export const progressBar = new QProgress( {
  minimum: 0.08,
  height: 3,
  color: '#e9a409'
} );

import vueRouter from 'vue-router/types';

export function registerRouterHooks ( router: vueRouter ) {
  router.beforeEach( ( to, from, next ) => {
    progressBar.start();
    next();
  } );

  router.afterEach( ( to, from ) => {
    progressBar.finish();
  } );

  router.onError( ( err ) => {} );
}

