/*
 * @Author: your name
 * @Date: 2020-07-28 21:46:17
 * @lastTime: 2020-07-29 15:41:56
 * @LastAuthor: huangyuhui
 * @Description: 懒加载组件
 * @FilePath: \supply-chain-system\src\plugins\lazyComponent\index.js
 */
import '@/plugins/lazyComponent/lazy.scss';

const LazyComponent =  {
  name: 'lazy-box',
  data: () => ( {
    showCom: false
  } ),

  mounted () {

    // 注册事件
    const elem = this.$el;
    const intersectionObserver = new IntersectionObserver( ( [ entries ] ) => {
      const isShow = entries.isIntersecting;
      if ( isShow ) {
        intersectionObserver.unobserve( elem );
        this.showCom = true;
      }
    } );
    intersectionObserver.observe( elem );
  },

  render () {
    const h = this.$parent.$createElement;
    let { height = '500px' } = this.$attrs;
    if ( /^\d+$/.test( height ) ) {
      height = height + 'px';
    }
    return h(
      'div', {
        class: 'lazy-box',
        style: {

          // 必须设置高度参数
          'min-height':  height
        }
      },

      this.showCom ? [
        h(
          'DynamicComponent',
          {
            props: this.$attrs
          }
        )
      ] :
        ( this.$slots.default ?? [] )
    );
  }
}; 
import DynamicComponent from '@/TestCom.js';
export default () => {
  return {
    // eslint-disable-next-line no-undef
    LazyComponent,
    // eslint-disable-next-line new-cap
    DynamicComponent: DynamicComponent()
  };
};