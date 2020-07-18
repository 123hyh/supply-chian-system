/*
 * @Author: your name
 * @Date: 2020-07-17 21:34:48
 * @LastEditTime: 2020-07-18 22:04:47
 * @LastEditors: Please set LastEditors
 * @Description: 创建查询栏
 * @FilePath: /supply-chian-system/src/pligins/TableJsx/Query.js
 */
import Vue from 'vue';
import { Loading } from 'element-ui';

/* 普通文字输入框 */
function stringComponent ( createElement, { key: bindFiled } = {} ) {
  return createElement(
    'InputComponent',
    {
      props: {
        size: 'small',
        value: this.queryData.fromData[ bindFiled ],
        clearable: true,
        placeholder: '请输入查询的内容'
      },
      on: {
        input: ( data = '' ) => {
          this.$set( this.queryData.fromData, bindFiled, data );
        }
      },
      nativeOn: {

        /* 按下回车键进行进行查询列表 */
        keyup: ( e ) => {
          e.stopPropagation();
          if ( event.keyCode === 13 ) {
            const data = JSON.parse(
              JSON.stringify( this.queryData.fromData )
            );
            this.$emit( 'handFindList', data );
          }
        }
      }
    }
  );
}

/* 下拉框 */
function selectComponent ( createElement, { key: bindFiled, options: selectOption, label } = {} ) {
  return createElement( 'SelectComponent', {
    props: {
      size: 'small',
      value: this.queryData.fromData[ bindFiled ],
      clearable: true,
      placeholder: `请选择${label}`
    },
    domProps: {
    },
    on: {
      input: ( data = '' ) => {
        this.$set( this.queryData.fromData, bindFiled, data );
      }
    },
    nativeOn: {

      /* 按下回车键进行进行查询列表 */
      keyup: ( e ) => {
        e.stopPropagation();
        if ( event.keyCode === 13 ) {
          const data = JSON.parse(
            JSON.stringify( this.queryData.fromData )
          );
          this.$emit( 'handFindList', data );
        }
      }
    }
  },

  /* 下拉选项 */
  selectOption.map(
    (
      { label, value } = {}
    ) => {
      return createElement(
        'OptionComponent',
        {
          props: {
            label,
            value
          }
        }
      );
    }
  ) );
}

/* 时间输入框 */
function dateComponent ( createElement, { key: bindFiled } = {} ) {
  return createElement(
    'DatePickerComponent',
    {
      props: {
        size: 'small',
        value: this.queryData.fromData[ bindFiled ],
        placeholder: '请选择日期',
        'value-format': 'yyyy-MM-dd',
        clearable: true
      },
      on: {
        'input': ( value ) => {
          this.$set( this.queryData.fromData, bindFiled, value );
        }
      }
    }
  );
}

/* 排序 ob */
const sortObserve = Vue.observable( { filed: '', data: '' } );

/* 创建 查询输入框 */
export const createQueryItem = () => {

  /* 每个查询框的 ob */
  const state = Vue.observable( { visible: false } );

  return function createQueryItem ( h, currentColumnConf = {} ) {
    const { key: bindFiled, searchType: type, sortable = false } = currentColumnConf;

    const components = {
      string: stringComponent,
      select: selectComponent,
      date: dateComponent,
      undefined: () => h( '' )
    };

    /* 查询框 */
    return h( 'div',
      {
        class: 'column-block-item'
      },
      [
        type ? h(
          'PopoverComponent',
          {
            props: {
              placement: 'top',
              value: state.visible,
              'popper-class': 'query-item-modal'
            },
            on: {
              input: ( visible = false ) => {
                state.visible = visible;
              }
            }
          },
          [

            /* 查询输入框 */
            components[ type in components ? type : 'undefined' ].call( this, h, currentColumnConf ),

            /* 按钮 */
            h(
              'div',
              {
                class: 'query-item-opration'
              },
              [
                h(
                  'ButtonComponent',
                  {
                    domProps: {
                      innerHTML: '重置'
                    },
                    props: {
                      size: 'mini'
                    },
                    on: {
                      'click': () => {
                        this.queryData.fromData = {};
                        state.visible = false;
                      }
                    }
                  }
                ),
                h(
                  'ButtonComponent',
                  {
                    domProps: {
                      innerHTML: '查询'
                    },
                    props: {
                      type: 'primary',
                      size: 'mini'
                    },
                    on: {
                      'click': () => {
                        state.visible = false;
                        console.log( sortObserve );
                        this.$emit( 'handFindList', this.queryData.fromData );
                        const ld = Loading.service( {
                          target: this.$el,
                          text: '正在查询数据'
                        } );
                        setTimeout( () => {
                          ld.close();
                        }, 1500 );
                      }
                    }
                  }
                )
              ]
            ),

            /* 查询图标 */
            h(
              'i',
              {
                attrs:{
                  title: '查询'
                },
                class: 'el-icon-search',
                slot: 'reference'
              }
            )
          ]
        ) : h( 'div' ),

        /* 排序图标 */
        sortable &&  h(
          'div',
          {
            class: 'column-block-item-sort'
          },
          [
            h(
              'i',
              {
                class: [
                  'sort-top',
                  'el-icon-caret-top',
                  { 'is-active-srot': sortObserve.filed === bindFiled && sortObserve.data === 'asc' }
                ],
                on: {
                  'click': () => {
                    const ld = Loading.service( {
                      target: this.$el,
                      text: '正在查询数据'
                    } );
                    setTimeout( () => {
                      ld.close();
                    }, 1500 );
                    const flag = sortObserve.data;
                    const ob = sortObserve;
                    ob.data = flag === 'asc' ? 'desc' : 'asc';
                    ob.filed = bindFiled;

                  }
                }
              }
            ),
            h(
              'i',
              {
                class: [
                  'sort-bottom',
                  'el-icon-caret-bottom',
                  { 'is-active-srot': sortObserve.filed === bindFiled && sortObserve.data === 'desc' }
                ],
                on: {
                  'click': () => {
                    const ld = Loading.service( {
                      target: this.$el,
                      text: '正在查询数据'
                    } );
                    setTimeout( () => {
                      ld.close();
                    }, 1500 );
                    const flag = sortObserve.data;
                    const ob = sortObserve;
                    ob.data = flag === 'desc' ? 'asc' : 'desc';
                    ob.filed = bindFiled;
                  }
                }
              }
            )
          ]
        )
      ]
    );
  };
};
