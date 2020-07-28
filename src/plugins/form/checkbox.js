/*
 * @Author: huangyuhui
 * @since: 2020-07-28 09:19:39
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-28 10:40:11
 * @message: 
 * @FilePath: \supply-chain-system\src\plugins\form\checkbox.js
 */
export default {
  functional: true,
  render ( _, context ) {
    const h = context.parent.$createElement;
    let { data: { props: { value = [], currentConf: { options, prop } } }, listeners } = context;
    value = value ? value : [];
    return h(
      'CheckboxGroup',
      {
        props: {
          value
        },
        on: {
          ...listeners
        }
      },
      [
        options.map(
          ( { label, value } ) => {
            return h(
              'Checkbox',
              {
                props: {
                  label: value
                },
                key: prop + value
              },
              [ label ]
            );
          }
        )
      ]
    );
  }
};