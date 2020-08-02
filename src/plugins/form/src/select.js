/*
 * @Author: your name
 * @Date: 2020-07-31 12:32:56
 * @LastEditTime: 2020-08-02 18:07:35
 * @LastEditors: Please set LastEditors
 * @Description: 下拉选择
 * @FilePath: /supply-chian-system/src/plugins/form/src/select.js
 */ 
import { FormItem, Select, Option } from 'element-ui';
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
    },
    classList: {
      type:[ Array, Object ]
    }
  },
  components:{
    FormItem,
    Select,
    Option
  },
  render ( h ) {
    const { prop, disabled, readonly, rules = [], options = [], label = '', placeholder = '请选择' } = this.currentConf;
    return h(
      'FormItem',
      {
        class: this.classList,
        props: {
          label,
          prop,
          rules
        }
      },
      [
        h( 
          'Select',
          {
            props:{
              value:  this.state[ prop ] ?? '',
              id: prop,
              disabled,
              readonly,
              placeholder,
              clearable: true,

              /* 不插入body */
              popperAppendToBody: false
            },
            on:{
              input: ( data ) => {
                this.setState( prop, data );
              }
            }
          },
          options.map(
            ( { label, value } ) => h( 
              'Option', 
              {
                props:{
                  label,
                  value
                }
              }
            )
          )
        )
      ]
    );
  }
};