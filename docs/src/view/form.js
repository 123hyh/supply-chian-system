/*
 * @Author: your name
 * @Date: 2020-08-01 16:21:44
 * @LastEditTime: 2020-08-02 19:51:49
 * @LastEditors: Please set LastEditors
 * @Description: 表单文档
 * @FilePath: /supply-chian-system/docs/src/view/form.js
 */
const HTMLTEMPLATE =
  `<template>
  <div>
    <FormComponent :form="form"/>
  </div>
</template>

<script>
import { FormComponent, useForm } from '@/plugins/form/index.js';
export default {
  
  components: {
    FormComponent
  },

  data: () => ( {
    /* 使用表单方法 */
    form: useForm({
      groupOption: { 
        /* 分组表单选项 */ 
      },
      config: { 
        /* 表单字段配置 */ 
      }
    })
  } ),

  mounted () {
    /* 使用表单方法 */
    const onwatch = this.form.registerChange( 'name', ( v, o ) => {
      console.log( '变化了~' );
    } );
  }
};`;

function transformEncode ( source = '' ) {
  source = source.replace( /</g, '&lt;' );
  source = source.replace( />/g, '&gt;' );
  return source;
}


import '@docs/styles/form.scss';
export default {
  render ( h ) {
    return h(
      'div',
      [
        h(
          'div',
          [
            h(
              'h3',
              '1:  导入Form组件'
            ),
            h(
              'div',
              {
                class: [
                  'text-indent',
                  'code-box'
                ]
              },
              [
                h(
                  'code',
                  'import { FormComponent, useForm } from \'@/plugins/form/index.js\';'
                )
              ]
            ),
            h( 'hr' )
          ]
        ),
        h(
          'div',
          [
            h(
              'h3', 
              '2:  使用' 
            ),
            h(
              'pre',
              {
                class: [ 'code-box' ],
                domProps: {
                  innerHTML: transformEncode( HTMLTEMPLATE )
                }
              }

            ),
            h( 'hr' )
          ]
        ),
        h(
          'div',
          [
            h(
              'h3',
              '3: useForm 方法'
            ),
            h(
              'ol',
              [
                h( 
                  'li', 
                  [
                    h( 'div', '参数 类型: Object' )
                  ]
                ),
                h( 'li', '返回值' ),
                h( 'li', 'demo' )
              ]
            )
          ]
        )
      ]
    );
  },
  mounted () {
    console.log( this.$vnode.data );
  }
};