/*
 * @Author: your name
 * @Date: 2020-07-31 12:40:09
 * @lastTime: 2020-08-05 11:38:14
 * @LastAuthor: huangyuhui
 * @Description: 字符串输入
 * @FilePath: \supply-chain-system\src\plugins\form\src\string.js
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
    let { prop, disabled, readonly, rules = [], label = '', prefix, placeholder = '' } = this.currentConf;
    const isPrefix = !!prefix;
    return h(
      'div',
      {
        class: {
          'prefix-form-item-box': isPrefix,
          'string-input': !isPrefix
        }
      },
      [
        ...(
          prefix ?
            [
              h(
                'label',
                {
                  class: [ 'el-form-item__label' ],
                  attrs:{
                    for: prefix.prop
                  }
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
            class: { 
              'prefix-form-item-string': !!prefix 
            },
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
                attrs: {
                  placeholder,
                  id: prop
                },
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