/*
 * @Author: your name
 * @Date: 2020-08-01 15:53:36
 * @LastEditTime: 2020-08-01 16:28:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/docs/src/view/index.js
 */
import { Tabs, TabPane } from 'element-ui';
const list = [
  { label: '表单', value: 'FormDoc' },
  { label: '表格', value: 'table' }
];
export default {
  components: {
    Tabs,
    TabPane,
    FormDoc: () => import( '@docs/view/form.js' )
  },
  data () {
    return {
      activeName: 'table'
    };
  },
  render ( h ) {
    return h(
      'div',
      [
        h( 
          'Tabs',
          {
            props: {
              value: this.activeName,
              type: 'card',
              lazy: true
            }
          }, 
          list.map(
            ( { label, value } ) => h(
              'TabPane',
              {
                props: {
                  label,
                  name: value
                }
              }
            )
          )
        ),
        h( 
          'components',
          {
            is: 'FormDoc'
          } 
        )
      ]
    );
  }
};