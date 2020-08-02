/*
 * @Author: your name
 * @Date: 2020-07-31 15:34:56
 * @LastEditTime: 2020-08-02 19:41:56
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
    const { prop, disabled, readonly, rules = [], label = '', placeholder, decimal = 0 } = this.currentConf;
    return h(
      'FormItem',
      {
        props: {
          label,
          prop,
          rules: [
            ...rules,
            {
              validator:
                ( _, value = '', callback ) => {
                  value = String( value );

                  /* 校验是否位数字 */
                  const reg = new RegExp( `^\\d+(\\.\\d{0,${decimal}})?$` );
                  let isNumber = reg.test( value );
                  console.log( isNumber );

                  /* 小数长度 */
                  const decimalLen = ( value.split( /\./ )[ 1 ] ?? '' ).length;

                  /* 提示信息 */
                  let msg = void 1;
                  if ( rules.length === 0 && value === '' ) {
                    msg = void 1;
                  } else if ( decimal === 0 && decimalLen > decimal ) {
                    msg = '请输入整数';
                  } else if ( decimalLen > decimal ) {
                    msg = `超过${decimal}位小数`;
                  } else if ( isNumber === false ) {
                    msg = '请输入正确数值';
                  }
                  callback( msg );
                }
            }
          ]
        }
      },
      [
        h(
          'InputComponent',
          {
            attrs: {
              id: prop,
              placeholder
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
    );
  }
};