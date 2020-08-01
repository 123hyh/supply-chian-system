/*
 * @Author: your name
 * @Date: 2020-07-31 15:27:57
 * @LastEditTime: 2020-07-31 15:31:26
 * @LastEditors: Please set LastEditors
 * @Description: 开关表单
 * @FilePath: /supply-chian-system/src/plugins/form/src/switch.js
 */
import { FormItem, Switch } from 'element-ui';
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
    SwitchCom:Switch
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
          'SwitchCom',
          {
            props: {
              value: this.state[ prop ] ?? false,
              disabled,
              readonly,
              id: prop
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