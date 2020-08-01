/*
 * @Author: your name
 * @Date: 2020-07-31 15:34:56
 * @LastEditTime: 2020-07-31 15:36:21
 * @LastEditors: Please set LastEditors
 * @Description: 数字输入框
 * @FilePath: /supply-chian-system/src/plugins/form/src/number.js
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
    const { prop, disabled, readonly, rules = [], label = '' } = this.currentConf;
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
            props: {
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