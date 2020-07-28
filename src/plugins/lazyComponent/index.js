/*
 * @Author: your name
 * @Date: 2020-07-28 21:46:17
 * @LastEditTime: 2020-07-28 23:58:46
 * @LastEditors: Please set LastEditors
 * @Description: 懒加载组件
 * @FilePath: /supply-chian-system/src/plugins/lazyComponent/index.js
 */
import '@/plugins/lazyComponent/lazy.scss';
import Vue from 'vue';
export default () => {
  const observe =  Vue.observable( {
    show: false
  } );
  return {
    functional: true,
    render ( _, context ) {
      const h = context.parent.$createElement;
      const { data } = context;
      const vnode = h( 
        'div', {
          class: 'lazy-box'
        }, 
        
        observe.show ?  [ 
          h( 
            'TestCom', 
            {
              props: data.attrs
            } 
          ) 
        ] :
          ( context.children ?? [] )
      );

      // 注册事件
      setTimeout( () => {
        const [ fistNode ] = vnode.children;
        console.log( vnode );
        const elem = fistNode.elm;
        const TYPE = Object.prototype.toString.call( elem );

        // 排除不必要的节点
        if ( /Comment\]$/i.test( TYPE ) ) return ;
        const intersectionObserver = new IntersectionObserver( ( [ entries ] ) => {
          const isShow = entries.isIntersecting;
          if ( isShow ) {
            intersectionObserver.unobserve( elem );
            observe.show = true;
          }
        } );
        debugger;
        intersectionObserver.observe( elem );
      } );
      return vnode;
    }
  };
}; 