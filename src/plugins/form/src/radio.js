/*
 * @Author: your name
 * @Date: 2020-07-31 15:22:43
 * @LastEditTime: 2020-07-31 15:36:34
 * @LastEditors: Please set LastEditors
 * @Description: 单选框
 * @FilePath: /supply-chian-system/src/plugins/form/src/radio.js
 */ 
import { FormItem, RadioGroup, Radio } from 'element-ui';
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
    RadioGroup,
    Radio
  },
  render ( h ) {
    const { prop, disabled, readonly, rules = [], options = [], label = ''  } = this.currentConf;
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
          'RadioGroup',
          {
            props: {
              value: this.state[ prop ] ?? '',
              disabled,
              readonly,
              id: prop
            },
            on: {
              input: ( data ) => {
                this.setState( prop, data );
              }
            }
          },
          options.map( ( { label, value } ) => h(
            'Radio',
            {
              props: {
                label: value
              }
            },
            label
          ) )
        )
      ]
    );
  }
};