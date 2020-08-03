/*
 * @Author: your name
 * @Date: 2020-07-25 21:43:12
 * @lastTime: 2020-08-03 10:31:20
 * @LastAuthor: huangyuhui
 * @Description: 表单组件
 * @FilePath: \supply-chain-system\src\plugins\form\index.js
 */

import './style/form.scss';
import {
  Form
} from 'element-ui';
import Vue from 'vue';
import { forEachObject } from '@/utils/index.ts';
import { cloneDeepWith, debounce } from 'lodash';

/* 表单type转组件名称 */
const TYPE_TO_COMPONENT = {
  string: 'StringComponent',
  select: 'SelectComponent',
  number: 'numberComponent',
  checkbox: 'CheckboxComponent',
  switch: 'SwitchComponent',
  date: 'DateComponent',
  radio: 'RadioComponent',
  selectInput: 'selectInput',
  textarea: 'TextareaComponent'
};

function isObject ( data ) {
  return Object.prototype.toString.call( data ) === '[object Object]';
}
function isString ( data ) {
  return Object.prototype.toString.call( data ) === '[object String]';
}

/**
 * 设置表单的值 
 * @param {string} key  字段名
 * @param {any} data 字段值
 */
function setState ( key, data ) {

  if (
    // eslint-disable-next-line no-prototype-builtins
    this.state.hasOwnProperty( key )
  ) {
    this.state[ key ] = data;
  } else {
    this.$set( this.state, key, data );
  }
}

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
              const { type } = currentItemConf;
              return h(
                TYPE_TO_COMPONENT[ type ],
                {
                  props: {

                    state: this.state,

                    /* 当前选项conf */
                    currentConf: currentItemConf,

                    /* 设置 state字段值 */
                    setState: setState.bind( this )
                  }
                }
              );

            }
          )
        )
      );
    }
  );
  return childrens;
}

/* 缓存 form组件 */
const cacheForm = new Map();

/* 递增 id */
let cid = 0;

/**
   * 注册操作表单方法
   * @param {type} 
   * @return: 
   * @description: 
   * 1: 调用该方法 返回 formId 及操作方法, 并往下传回来 props值
   * 2: 创建组件时 获得 formId ,在 created 钩子调用时 缓存当前 id 的组件
   * 
   */
export function useForm ( formConfig = { groupOption: {}, config: {} } ) {
  const _formId = cid++;

  /* 当前表单配置 */
  let currentFormConfig = Vue.observable( cloneDeepWith( formConfig ) ); 
    
  cacheForm.set( _formId, { config: currentFormConfig } );
  return {

    /* 当前表单id */
    get _formId () {
      return _formId;
    },

    /* 当前表单 实例组件 */
    get currentForm () {
      return cacheForm.get( _formId )?.instance;
    },
  

    /**
       * 完成表单,并校验
       * @param { Function }  handlerCb 表单校验通过后需要执行的回调
       * @return: 
       */
    onFinish ( handlerCb = () => { } ) {
      const currentForm = this.currentForm;
      let isPass = Boolean();
      currentForm.$refs.$$form.validate(
        ( e = false ) => {
          isPass = e;
          if ( e ) {
            handlerCb( cloneDeepWith( currentForm.state ) );
          }
        }
      );
      return isPass;
    },

    /**
       * 设置表单字段的值
       * @description: 
       * @param {type} 
       * @return: 
       */
    setValues ( data = {} ) {
      for ( const key in data ) {
        // eslint-disable-next-line no-prototype-builtins
        if ( data.hasOwnProperty( key ) ) {
          setState.call( this.currentForm, key, data[ key ] );
        }
      }
    },

    /**
       * 清空所有表单
       * @param { Array } fileds 需要清除的字段 
       * @return: 
       */
    onResetFields ( fileds = [] ) {
      if ( Array.isArray( fileds ) && fileds.length ) {
        for ( const key of fileds ) {
          this.currentForm.$delete( this.currentForm, key );
        }
        this.onClearValidate( fileds );
      } else {
        this.currentForm.state = {};
        this.onClearValidate();
      }
    },

    /**
       * 清除表单校验
       * @description: 
       * @param { Array } fileds 需要清除的表单字段 
       * @return: 
       */
    onClearValidate ( fileds = [] ) {
      this.currentForm.$refs.$$form.clearValidate( fileds );
    },

    /**
       * 注册 字段值change事件
       * @description: 
       * @param {string} filed 观察的字段 
       * @param {Function} watchCb 变化后触发的回调 
       * @param {boolean} immediate 是否立即触发
       * @return: unwatch 解除监听方法
       */
    registerChange ( filed, watchCb = ( value, oldValue ) => { }, immediate = false ) {
      let unwatch = () => { };

      if ( filed ) {
        unwatch = this.currentForm.$watch(
          `state.${filed}`,
          {
            get handler () {
              return debounce(
                ( value, oldValue ) => {
                  if ( value !== oldValue ) {
                    watchCb( value, oldValue );
                  }
                },
                200
              );
            },
            deep: true,
            immediate
          }
        );
      } else {
        throw new Error( '请传入change字段' );
      }
      return unwatch;
    },

    /**
     * 设置 | 更新 表单字段配置
     * @description: 
     * @param {string} filed 需要修改配置的字段名 
     * @param {object} config 表单配置 
     * @return: 
     */
    setFiledConfig ( filed, config = {} ) {
      if ( isString( filed ) &&  filed !== '' &&  isObject( config ) ) {
        const primaryConf = currentFormConfig.config[ filed ] ?? {};

        Vue.set( currentFormConfig.config, filed, { ...primaryConf, ...config } );
      } else {
        throw new Error( '请保证参数的是否正确' );
      }
    }
  };
}

export const FormComponent = {
  abstract: true,

  /* 收集 form */
  created () {
    const { _formId } = this.form;
    const config = ( cacheForm.get( _formId ) )?.config;
    cacheForm.set( _formId, { instance: this, config } );
  },

  components: {
    FormComponent: Form,
    StringComponent: () => import( /* webpackChunkName: "strings" */'@/plugins/form/src/string.js' ),
    NumberComponent: () => import( /* webpackChunkName: "number" */'@/plugins/form/src/number.js' ),
    SelectComponent: () => import( /* webpackChunkName: "select" */'@/plugins/form/src/select.js' ),
    DateComponent: () => import( /* webpackChunkName: "date" */ '@/plugins/form/src/date.js' ),
    CheckboxComponent: () => import( /* webpackChunkName: "checkbox" */'@/plugins/form/src/checkbox.js' ),
    RadioComponent: () => import( /* webpackChunkName: "radio" */'@/plugins/form/src/radio.js' ),
    SwitchComponent: () => import( /* webpackChunkName: "switch" */'@/plugins/form/src/switch.js' ),
    TextareaComponent:() => import( /* webpackChunkName: "textarea" */'@/plugins/form/src/textarea.js' )
  },
  props: {

    form: {
      type: Object,
      defualt: () => ( {} )
    },

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
            readonly: false,

            /* 是否禁用表单 */
            disabled: false,

            /* 分组 flag */
            group: 1,

            /* 校验规则 */
            rules: [ { required: true, message: '必填', trigger: [ 'blur' ] } ],

            /* 前缀表单 */
            prefix: {
              prop: 'prefixSelect',
              type: 'select',
              options: [
                { label: '美金', value: 1 },
                { label: '港币', value: 2 }
              ],
              rules: [ { required: true, message: '必填', trigger: [ 'blur' ] } ]
            }
          },
          sex: {
            type: 'select',
            group: 1,
            label: '性别',
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 0 }
            ]
          },
          birthTime: {
            type: 'date',
            label: '出生日期',
            group: 5
          },
          hobby: {
            type: 'checkbox',
            options: [
              { label: '踢球', value: '1' },
              { label: '打篮球', value: '2' }
            ],
            label: '爱好',
            group: 1
          },
          radio: {
            type: 'radio',
            label: '单选',
            group: 6,
            options: [
              { label: '单选1', value: 1 },
              { label: '单选2', value: 2 }
            ]
          },
          isOut: {
            type: 'switch',
            group: 5,
            label: '离职'
          },
          age: {
            type: 'number',
            label: '年龄',
            group: 1,
            decimal: 2
          }

          /* selectInput:{
            type: 'selectInput',
            label:'下拉+输入框',
            selectProp:'select1',
            inputProp: 'input1'
          } */
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

    /* 当前表单配置 */
    formConfig () {
      const c =  cacheForm.get( this.form._formId ).config;
      return this.handlerFormConfig(  c?.config ?? {} );
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
          model: this.state
        },
        ref: '$$form'
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
  },

  beforeDestroy () {
    const cid = this.form._formId;
    cacheForm.delete( cid );
  }
};
