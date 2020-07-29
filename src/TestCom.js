/*
 * @Author: huangyuhui
 * @since: 2020-07-20 08:48:33
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-29 18:05:21
 * @message: 动态组件原理
 * @FilePath: \supply-chain-system\src\TestCom.js
 */
export default () => {

  /* 缓存组件 */
  let cache = {};
  async function getComponent ( component, obj, name ) {
    try {
      const res = await component();
      if ( '__esModule' in res ) {
        obj[ name ] = res.default;
        this.$forceUpdate();
      }

    } catch ( error ) {
      console.log( error );
    }
  }
  return  {
    functional: true,
    render ( _, { props, parent, children, ...options } ) {
      const currentCom = parent.$options.components[ props.cname ];
      const h = parent.$createElement;

      /* 销毁组件时清除闭包 */
      parent.$destroy( () => {
        debugger;
      } );
      if ( props.cname in cache ) {
        const com = cache[ props.cname ];
        return h( com, {
          props: {
            list: []
          }
        } );
      } else {
        getComponent.call( parent, currentCom, cache, props.cname );
        return h( 'div', children );
      }
    }
  };
};
