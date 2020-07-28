/*
 * @Author: huangyuhui
 * @since: 2020-07-28 10:24:25
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-28 10:46:47
 * @message: 
 * @FilePath: \supply-chain-system\src\plugins\form\select.js
 */

export default {
  functional: true,
  render ( _, context ) {
    const h = context.parent.$createElement;
    let {
      props: {
        value,
        currentConf: { options, prop, multiple, disabled }
      }
    } = context.data;
    return h(
      'Select',
      {
        props: {
          value,
          filterable: true,
          multiple,
          disabled
        },
        on: {
          ...context.listeners
        }
      },
      options.map( 
        ( { label, value } ) => {
          return h( 'Option', {
            props: {
              label,
              value
            },
            key: prop + value
          }
          );
        }
      )
    );
  }
};