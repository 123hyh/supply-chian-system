<!--
 * @Author: your name
 * @Date: 2020-07-30 21:20:00
 * @LastEditTime: 2020-08-02 20:41:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/view/Test/form.vue
--> 
<template>
  <div>
    <FormCom :form="form"/>
    <div>
      <button @click="onevalidate">
        validate
      </button>
      <button @click="reset">
        reset
      </button>
      <button @click="setValues">
        setValues
      </button>
      <button @click="setFiledConf">
        setFiledConf
      </button>
    </div>
  </div>
</template>
<script>
import { FormComponent, useForm } from '@/plugins/form/index.js';
export default {
  components: {
    FormCom: FormComponent
  },
  data () {
    return {
      form: useForm( {
        groupOption: {
          1: {
            title: '标题１'
          },
          2: {
            title: '标题２'
          }
        },
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
          },

          textarea1:{
            type: 'textarea',
            label:'输入框'
          }
        }
      } )
    };
  },
  mounted () {
    const onwatch = this.form.registerChange( 'name', ( v, o ) => {
      console.log( '变化了~' );
    } );
  },
  methods: {
    onevalidate () {
      console.log(
        this.form.onFinish( e => {
          console.log( '校验通过~' );
        } )
      );
    },
    reset () {
      console.log( '清空表单~' );
      this.form.onResetFields();
    },
    setValues () {
      this.form.setValues( {
        setv: 'ceshi'
      } );
    },
    setFiledConf () {
      this.form.setFiledConfig( 'test1', { group:1, label:'测试', type: 'string' }, this );
    }
  }
};
</script>