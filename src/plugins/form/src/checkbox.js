/*
 * @Author: your name
 * @Date: 2020-07-31 15:17:05
 * @LastEditTime: 2020-07-31 15:32:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/plugins/form/src/checkbox.js
 */
import { FormItem, CheckboxGroup, Checkbox } from 'element-ui';
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
    CheckboxGroup,
    Checkbox
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
          'CheckboxGroup',
          {
            props: {
              value: this.state[ prop ] ?? [],
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
            'Checkbox',
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