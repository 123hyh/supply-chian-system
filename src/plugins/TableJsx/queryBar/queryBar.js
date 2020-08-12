/**
 * @description 查询栏组件
 */

import './queryBar.scss';

import { FormComponent, useForm } from '@/plugins/form/index.js';
import { Button, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';

export default {
  name: 'QueryBar',
  components: {
    XyButton: Button,
    FormComponent,
    Dropdown, 
    DropdownMenu,
    DropdownItem
  },
  data () {
    return {
      form: useForm( {
        config: {
          name: {
            type: 'string',
            placeholder: '姓名'
          },
          age: {
            type: 'string',
            placeholder: '年龄'
          },
          time: {
            type: 'date',
            placeholder: '时间'
          },
          time1: {
            type: 'date',
            placeholder: '时间'
          },
          time2: {
            type: 'date',
            placeholder: '时间'
          },
          time3: {
            type: 'date',
            placeholder: '时间'
          },
          time4: {
            type: 'date',
            placeholder: '时间'
          },
          selectd: {
            type: 'select',
            placeholder: '喜好',
            options: [
              { label: '打球', value: '1' },
              { label: '打机', value: '2' }
            ]
          },
          selectd1: {
            type: 'select',
            placeholder: '喜好',
            options: [
              { label: '打球', value: '1' },
              { label: '打机', value: '2' }
            ]
          },
          selectd2: {
            type: 'select',
            placeholder: '喜好',
            options: [
              { label: '打球', value: '1' },
              { label: '打机', value: '2' }
            ]
          }
        }
      } ),

      /* 查询栏展开按钮 */
      isElasticity: false
    };
  },
  render ( h ) {
    return h(
      'div',
      {
        class: [ 'xy-table-query-box' ]
      },

      /* 查询输入框 */
      [
        h(
          'div',
          {
            class: [
              'xy-table-query-form',
              this.isElasticity && 'xy-table-query-form-max'
            ].filter( Boolean )
          },
          [
            h(
              'FormComponent',
              {
                props: {
                  form: this.form
                }
              }
            ),

            /* 图标 */
            h( 
              'i',
              {
                class: [ 
                  'icon',
                  { [ `el-icon-arrow-${this.isElasticity ? 'down' : 'up'}` ]: true }
                ],
                attrs: {
                  title: this.isElasticity ? '展开' : '收起'
                },
                on: {
                  click:() => {
                    this.isElasticity = !this.isElasticity;
                  }
                }
              } 
            )
          ]
        ),

        /* 按钮栏 */
        h(
          'div',
          {
            class: [ 'xy-table-query-buttons' ]
          },
          [
            h(
              'XyButton',
              {
                props: {
                  size: 'small',
                  type: 'primary',
                  icon: 'el-icon-search'
                },
                on: {
                  click: () => {
                    this.form.onFinish(
                      ( condition = {} ) => {
                        this.$emit( 'handFindList', condition );
                      }
                    );
                  }
                }
              },
              '查询'
            )
          ]
        ),

        /* 工具栏 */
        h(
          'div',
          {
            class:[ 'xy-table-query-tools' ]
          },
          [ 
            h( 
              'Dropdown', 
              {
                props:{
                  trigger:'click'
                }
              },
              [
                h(
                  'XyButton',
                  {
                    props: {
                      size:'small',
                      icon:'el-icon-s-grid'
                    }
                  }
                ),

                /* 表格列筛选 */
                h(
                  'DropdownMenu',
                  {
                    props:{
                      appendToBody: false
                    },
                    slot: 'dropdown'
                  },
                  [
                    h(
                      'DropdownItem',
                      1
                    )
                  ]
                )
              ] 
            ),

            /* 导出按钮 */
            h( 
              'Dropdown', 
              {
                props:{
                  trigger:'click'
                }
              },
              [
                h(
                  'XyButton',
                  {
                    props: {
                      size:'small',
                      icon:'el-icon-download'
                    }
                  }
                ), 

                /* 导出工具 */
                h(
                  'DropdownMenu',
                  {
                    props:{
                      appendToBody: false
                    },
                    slot: 'dropdown'
                  },
                  [ '.cvs', '.text', '.doc', '.xlsx' ].map(
                    item => h(
                      'DropdownItem',
                      item
                    )
                  )
                ) 
              ]
            )
          ]
        )
      ]
    );
  }
};