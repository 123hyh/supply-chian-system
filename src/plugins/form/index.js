/*
 * @Author: your name
 * @Date: 2020-07-25 21:43:12
 * @lastTime: 2020-07-28 10:52:51
 * @LastAuthor: huangyuhui
 * @Description: 表单组件
 * @FilePath: \supply-chain-system\src\plugins\form\index.js
 */
import {
  Form, FormItem, Input, InputNumber, Select, Option,
  TimePicker, DatePicker, CheckboxGroup, Checkbox,
  Switch
} from 'element-ui';
import { forEachObject } from '@/utils/index.ts';
import { cloneDeepWith } from 'lodash';
import './form.scss';

/* 表单type转组件名称 */
const TYPE_TO_COMPONENT = {
  string: 'InputComponent',
  number: 'InputNumberComponent',
  checkbox: 'CheckboxComponent',
  select: 'SelectComponent',
  switch:'SwitchComponent'
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
                [
                  h(
                    TYPE_TO_COMPONENT[ type ],
                    {
                      props: {
                        value: this.state[ prop ] ?? '',

                        /* 当前选项conf */
                        currentConf: currentItemConf
                      },
                      on: {
                        'input': ( data ) => {
                          this.$set( this.state, prop, data );
                        }
                      }
                    }
                  )
                ]
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
    CheckboxGroup,
    Checkbox,
    CheckboxComponent: () => import( '@/plugins/form/checkbox.js' ),
    Select,
    Option,
    SelectComponent: () => import( '@/plugins/form/select.js' ),
    SwitchCom: Switch,
    SwitchComponent:() => import( '@/plugins/form/switch.js' )
  },
  props: {

    /* 表单大小 */
    size: {
      type: String,
      default: 'small'
    },
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
          },
          hobby: {
            type: 'checkbox',
            options:[
              { label:'踢球', value:'1' },
              { label:'打篮球', value:'2' }
            ],
            label: '爱好',
            group: 3
          },
          sex:{
            type: 'select',
            group: 4,
            label:'性别',
            options:[
              { label:'男', value:1 },
              { label:'女', value:0 }
            ]
          },
          isOut:{
            type: 'switch',
            group: 5,
            label:'离职'
          }
        }
      } )
    }
  },
  data () {
    return {

      /* 表单数据 */
      state: {
      }
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
    return createElement(
      'FormComponent',
      {
        class: [ 'form-component-box' ],
        props: {
          size: this.size,
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
