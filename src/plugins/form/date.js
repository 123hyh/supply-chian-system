/*
 * @Author: huangyuhui
 * @since: 2020-07-28 15:54:14
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-28 16:03:53
 * @message: 
 * @FilePath: \supply-chain-system\src\plugins\form\date.js
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

export default {
  functional: true,
  render ( _, context ) {
    const h = context.parent.$createElement;
    let {
      props: {
        value,
        currentConf: { multiple, disabled, format = 'yyyy-MM-dd HH:mm:ss' }
      }
    } = context.data;
    return h( 'DatePicker', {
      props: {
        value,
        disabled,
        type: 'datetime',
        format,
        'value-format': format,
        'picker-options': pickerOptions
      },
      on: {
        ...context.listeners
      }
    } );
  }
};