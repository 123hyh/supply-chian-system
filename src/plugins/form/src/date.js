/*
 * @Author: your name
 * @Date: 2020-07-31 12:32:56
 * @LastEditTime: 2020-07-31 15:14:51
 * @LastEditors: Please set LastEditors
 * @Description: 时间输入框
 * @FilePath: /supply-chian-system/src/plugins/form/src/date.js
 */
const pickerOptions = {
  shortcuts: [ {
    text: '今天',
    onClick ( picker ) {
      picker.$emit( 'pick', new Date() );
    }
  }, {
    text: '昨天',
    onClick ( picker ) {
      const date = new Date();
      date.setTime( date.getTime() - 3600 * 1000 * 24 );
      picker.$emit( 'pick', date );
    }
  }, {
    text: '一周前',
    onClick ( picker ) {
      const date = new Date();
      date.setTime( date.getTime() - 3600 * 1000 * 24 * 7 );
      picker.$emit( 'pick', date );
    }
  } ]
};
import { FormItem, DatePicker } from 'element-ui';
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
    DatePicker
  },
  render ( h ) {
    const { prop, disabled, readonly, rules = [], options = [], label = '', format = 'yyyy-MM-dd' } = this.currentConf;
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
          'DatePicker',
          {
            props: {
              value: this.state[ prop ] ?? '',
              disabled,
              readonly,
              clearable: true,
              id:prop,
              format,
              'picker-options': pickerOptions
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