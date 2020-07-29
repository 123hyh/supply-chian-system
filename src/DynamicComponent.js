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
  let cacheComponents = {};
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
  return  [ 
    function removeComponent ( cname )  {
      delete cacheComponents[ cname ];
    }, 
    {
      functional: true,
      render ( _, { parent, children, ...options } ) {
        const { data:{ props = {}, on = {} } } = options;
        const { cname, ...propsOption } = props;
        const currentCom = parent.$options.components[ cname ];
        const h = parent.$createElement;
        if ( cname in cacheComponents ) {
          const component = cacheComponents[ cname ];

          // 触发上级方法，显示子组件
          on.__setChildLoad();
          return h(
            component,
            {
              props: {
                ...propsOption
              },
              on:{
                ...on
              }
            },
            children
          );
        } else {
          getComponent.call( parent, currentCom, cacheComponents, cname );
          return h( 'div', children );
        }
      }
    } ];
};
