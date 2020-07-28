/*
 * @Author: huangyuhui
 * @since: 2020-07-28 10:48:42
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-28 10:54:04
 * @message: 
 * @FilePath: \supply-chain-system\src\plugins\form\switch.js
 */
export default {
  functional: true,
  render ( _, context ) {
    const h = context.parent.$createElement;
    let {
      props: {
        value = false,
        currentConf: { disabled }
      }
    } = context.data;
    return h( 'SwitchCom', {
      props: {
        value,
        disabled
      },
      on: {
        ...context.listeners
      }
    } );
  }
};