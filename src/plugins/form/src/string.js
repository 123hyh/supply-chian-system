/*
 * @Author: your name
 * @Date: 2020-07-31 12:40:09
 * @LastEditTime: 2020-07-31 16:29:08
 * @LastEditors: Please set LastEditors
 * @Description: 字符串输入
 * @FilePath: /supply-chian-system/src/plugins/form/src/string.js
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
    InputComponent: Input,
    SelectComponent: () => import( '@/plugins/form/src/select.js' )
  },
  render ( h ) {
    let { prop, disabled, readonly, rules = [], label = '', prefix } = this.currentConf;
    return h(
      'div',
      {
        class: [ 'prefix-form-item-box' ]
      },
      [
        ...(
          prefix ?
            [
              h(
                'label',
                {
                  class: [ 'el-form-item__label' ]
                },
                label
              ),
              h(
                'SelectComponent',
                {
                  props: {
                    state: this.state,
                    setState: this.setState,
                    currentConf: prefix,
                    classList: { 'prefix-form-item-select': !!prefix }
                  }
                }
              )
            ] :
            []
        ),
        h(
          'FormItem',
          {
            class: { 'prefix-form-item-string': !!prefix },
            props: {
              label: prefix ? '' : label,
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
        )
      ]
    );
  }
};