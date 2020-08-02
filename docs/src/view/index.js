/*
 * @Author: your name
 * @Date: 2020-08-01 15:53:36
 * @LastEditTime: 2020-08-02 19:42:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/docs/src/view/index.js
 */
// import '@docs/styles/index.scss';
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
      activeName: 'FormDoc'
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
              'tab-position':'left'
            },
            on:{
              input: data  => {
                this.activeName = data;
              }
            }
          }, 
          list.map(
            ( { label, value } ) => h(
              'TabPane',
              {
                props: {
                  lazy: true,
                  label,
                  name: value
                }
              },
              [
                h(
                  this.activeName
                )
              ]
            )
          )
        )
      ]
    );
  }
};