/*
 * @Author: huangyuhui
 * @since: 2020-07-20 08:48:33
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-22 15:10:51
 * @message: 动态组件原理
 * @FilePath: \supply-chain-system\src\TestCom.js
 */
const cache = {};
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
export default {
  functional: true,
  props: {
    cname: {
      type: String,
      default: ''
    }
  },
  render ( _, { props, parent, children } ) {
    const { cname, ...o } = props;
    const currentCom = parent.$options.components[ props.cname ];
    const h = parent.$createElement;
    if ( props.cname in cache ) {
      const com = cache[ props.cname ];
      return h( com, {
        props: {
          list: []
        }
      }, children );
    } else {
      getComponent.call( parent, currentCom, cache, props.cname );
      return h( 'div', '' );
    }
  }
};