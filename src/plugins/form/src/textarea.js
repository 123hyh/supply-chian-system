/*
 * @Author: your name
 * @Date: 2020-08-02 18:13:08
 * @LastEditTime: 2020-08-02 18:13:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/plugins/form/src/textarea.js
 */ 
import { FormItem, Input } from 'element-ui';
export default {
  abstract: true,
  props: {
    state: {
      type: Object,
      required: true
    },
    currentConf: {
      type: Object,
      required: true
    },
    setState: {
      type: Function,
      required: true
    }
  },
  components: {
    FormItem,
    InputComponent: Input
  },
  render ( h ) {
    const { prop, disabled, readonly, rules = [], label = '', placeholder } = this.currentConf;
    return h(
      'FormItem',
      {
        props: {
          label,
          prop,
          rules
        }
      },
      [
        h(
          'InputComponent',
          {
            attrs:{
              id: prop,
              placeholder
            },
            props: {
              type: 'textarea',
              value: this.state[ prop ] ?? '',
              disabled,
              readonly,
              clearable: true
            },
            on: {
              input: ( data ) => {
                this.setState( prop, data );
              }
            }
          }
        )
      ]
    );
  }
};
