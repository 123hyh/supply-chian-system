/*
 * @Author: your name
 * @Date: 2020-07-25 21:43:12
 * @LastEditTime: 2020-07-26 22:02:00
 * @LastEditors: Please set LastEditors
 * @Description: 表单组件
 * @FilePath: /supply-chian-system/src/plugins/form/index.js
 */
import { Form, FormItem, Input, InputNumber, Select, Option, TimePicker, DatePicker } from 'element-ui';
import { forEachObject } from '@/utils/index.ts';
import { cloneDeepWith } from 'lodash';

/* 表单type转组件名称 */
const TYPE_TO_COMPONENT = {
  string: 'InputComponent',
  number: 'InputNumberComponent'
};

/* 生成表单元素 */
function generateGroupChildren ( h ) {
  const childrens = [];
  forEachObject(
    this.formConfig,
    ( key, value ) => {
      childrens.push(
        h(
          'div',
          {
            class: `form-group form-group-${key}`
          },
          value.map( 
            currentItemConf => {
              const { label, type, prop } = currentItemConf;
              return h(
                'FormItemComponent',
                {
                  props: {
                    prop,
                    label
                  }
                },
                h(
                  TYPE_TO_COMPONENT[ type ],
                  {
                    props: {  
                      value: this.state[ prop ]
                    },
                    on: {
                      'input': ( e ) => {
                        debugger;
                      }
                    }
                  }
                )
              );
            } 
          )
        )
      );
    }
  );
  return childrens;
}

export default {
  components: {
    FormComponent: Form,
    FormItemComponent: FormItem,
    InputComponent: Input,
    InputNumberComponent: InputNumber,
    SelectComponent: Select,
    OptionComponent: Option
  },
  props: {
    schema: {
      type: Object,
      default: () => ( {

        /* 分组选项 */
        groupOption: {
          1: {
            title: '标题１'
          },
          2: {
            title: '标题２'
          }
        },

        /* 表单配置 */
        config: {
          name: {

            /* 表单类型 */
            type: 'string',

            /* 显示文字 */
            label: '姓名',

            /* 是否可输入 */
            readonly: true,

            /* 是否禁用表单 */
            disabled: true,

            /* 分组 flag */
            group: 1,

            /* 校验规则 */
            rules: []
          },
          age: {
            type: 'number',
            label: '年龄',
            group: 2
          }
        }
      } )
    }
  },
  data () {
    return {

      /* 表单数据 */
      state: {}
    };
  },
  computed: {

    /* 表单验证规则 */
    formRules () {
      return {

      };
    },

    /* 当前表单配置 */
    formConfig () {
      return this.handlerFormConfig( cloneDeepWith( this.schema?.config || {} ) );
    }
  },
  name: 'FormComponentBox',

  render ( createElement ) {
    console.log( 1 );

    return createElement(
      'FormComponent',
      {
        props: {
          mode: this.state,
          rules: this.formRules
        }
      },
      generateGroupChildren.call( this, createElement )
    );
  },
  methods: {

    /* 处理表单配置 */
    handlerFormConfig ( source, _request = {} ) {
      for ( const key of Object.keys( source ) ) {
        const { group, ...option } = source[ key ];
        _request[ group ] ?? ( _request[ group ] = [] );
        _request[ group ].push( { ...option, prop: key } );
      }
      return _request;
    }
  }
};
