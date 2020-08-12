/**
 * @description 查询栏组件
 */

import './queryBar.scss';

import { FormComponent, useForm } from '@/plugins/form/index.js';
import { Button } from 'element-ui';

export default {
  name: 'QueryBar',
  components: {
    XyButton: Button,
    FormComponent
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
      } )
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
            class: [ 'xy-table-query-form' ]
          },
          [
            h(
              'FormComponent',
              {
                props: {
                  form: this.form
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
        )
      ]
    );
  }
};