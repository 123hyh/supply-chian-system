/*
 * @Author: your name
 * @Date: 2020-07-07 21:19:29
 * @lastTime: 2020-07-13 16:40:19
 * @LastAuthor: huangyuhui
 * @Description: vuex 钩子
 * @FilePath: \supply-chain-system\src\store\hooks.ts
 */ 

export default function registerVuexHooks( store:any ) {
  // 1、 页面卸载时保存vuex 的 store 数据
  window.onbeforeunload = (): void => {
    sessionStorage.setItem( 'store', JSON.stringify( store.state ) );
  };

  // 2、页面刷新后重置 state
  {
    let state: any = sessionStorage.getItem( 'store' );
    state = JSON.parse( state ?? '""' );
    state && store.replaceState( state );
  } 
}
