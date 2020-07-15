/*
 * @Author: huangyuhui
 * @since: 2020-07-15 09:01:10
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-15 09:52:21
 * @message: 指令工具
 * @FilePath: \supply-chain-system\src\directives\index.ts
 */

import { VueConstructor } from 'vue';

/**
 * 刷新当前路由 指令
 * @description: 
 * @param {type} 
 * @return: 
 */
export function reload () {
  function handlerReload ( vm: any ) {
    return function () {
      vm.$router.replace( '/refresh' );
    };
  }
  let id = 0;

  /* 用于暂存 事件，在ubind 时 移除对应的事件 */
  const map = new Map();
  return {
    install ( Vue: VueConstructor ) {
      Vue.directive( 'reload', {
        inserted ( el: HTMLElement, _, vnode ) {
          const vm = vnode.context,
            handler = handlerReload( vm );
          map.set( id.toString(), handler );
          
          el.setAttribute( 'data-reload-id', `${id++}` );

          if ( vm && vm.$router ) {
            el.addEventListener( 'click', handler, false );
          } else {
            console.warn( '无法注册 reload 指令, 请先保证导入了 vue-router' );
          }
        },
        unbind ( el ) {
          const id =  el.getAttribute( 'data-reload-id' );
          const handler = map.get( id );

          /* 删除map中对应的事件 */
          map.delete( id );
          el.removeEventListener( 'click', handler, false );
        }
      } );
    }
  };
}
