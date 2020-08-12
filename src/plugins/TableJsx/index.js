/*
 * @Author: huangyuhui
 * @since: 2020-07-17 16:56:35
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-22 17:53:30
 * @message: 表格公共组件
 * @FilePath: \supply-chain-system\src\pligins\TableJsx\index.js
 */

import { Table, TableColumn, Input, FormItem, Select, Option, Popover, Button, DatePicker } from 'element-ui';
import './table.scss';
import { createQueryItem } from './tableComponents';
export default {
  components: {
    TableComponent: Table,
    TableColumnComponent: TableColumn,
    InputComponent: Input,
    FormItemComponent: FormItem,
    SelectComponent: Select,
    OptionComponent: Option,
    PopoverComponent: Popover,
    ButtonComponent: Button,
    DatePickerComponent: DatePicker
  },
  props: {

    /* 查询 */
    isQuery: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },

    /* 表格配置 */
    schema: {
      type: Array,
      default: () => ( [

        /* {
          label: '姓名',
          prop: 'name',
          width: 300,
          sortable: true,
          searchType: 'string'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '性别',
          prop: 'sex',

          // 查询表单类型
          searchType: 'select',

          // 查询栏选项
          options: [ { label: '男', value: 1 }, { label: '女', value: 0 } ]
        },
        {
          label: '出生',
          prop: 'createTime',
          searchType: 'date'
        },
        {
          label: '入职时间',
          prop: 'entryTime'
        },
        {
          label: '地址',
          prop: 'addess',
          children:[
            {
              label: '省',
              prop: 'province',
              children:[
                {
                  label:'测试3',
                  prop: 'test3'
                }
              ]
            },
            {
              label: '市',
              prop: 'city'
            },
            {
              label: '区',
              prop: 'district'
            }
          ]
        } */
      ] )
    },
    list: {
      type: Array,
      default: () => ( [
        { 
          name: 'mff', age: 18, createTime: '1993-09-01', entryTime: '2019-02-25', sex: 0,
          test3: '测试三级', province:'广东省', city:'深圳市', district:'罗湖区' 
        },
        { name: 'hyh', age: 18, createTime: '1999-09-01', entryTime: '2020-6-30', sex: 1 }
      ] )
    },

    /* 统计方法 */
    summaryMethod:{
      type: Function,
      default: () => () => {}
    }

  },
  data () {
    return {

      /* 当前点中行数据 */
      currentRowData: {},

      /* 查询输入框数据 */
      queryData: {
        fromData: {
        }
      }
    };
  },
  methods: {

    /* 点击列排序事件 */
    handlerColumnSort ( { column, prop, order } = {} ) {
      this.$emit( 'handColumnSort', { filed: prop, data: order } );
    }
  },
  render ( createElement ) {
    try {
      return createElement(
        'div',
        {
          class: [ 'xy-component-table' ]
        },
        [
          createElement(
            'TableComponent',
            {
              props: {
                data: this.list,
                size: this.size,
                highlightCurrentRow: true,
                border: true,
                'show-summary': true,
                'summary-method': this.summaryMethod
              },
              on: {

                /* 列点击排序事件 */
                'sort-change': this.handlerColumnSort,

                /* 点击当行数据 */
                'row-click': ( row ) => {
                  this.$emit(
                    'handClickRow',
                    this.currentRowData = JSON.parse( JSON.stringify( row )
                    )
                  );
                },

                /* 点击勾选复选框事件 */
                'selection-change': ( ...args ) => {
                  this.$emit( 'handSelection', ...args );
                },

                /* 双击行事件 */
                'row-dblclick': ( ...args ) => {
                  this.$emit( 'handRowDblclick', ...args );
                }
              }
            },
            [

              /* 列序号 */
              createElement( 'TableColumnComponent', {
                props: {
                  type: 'index',
                  label: '序号',
                  align: 'center'
                }
              } ),

              /* 选择列 */
              createElement( 'TableColumnComponent', {
                props: {
                  type: 'selection',
                  align: 'center'
                }
              } ),

              /* 展开详情 */
              createElement(
                'TableColumnComponent',
                {
                  props: {
                    type: 'expand',
                    align: 'center'
                  },
                  scopedSlots: {
                    default: ( { row: current } = {} ) => {
                      return createElement(
                        'ul',
                        {
                          class:'column-block-expand-content'
                        },
                        this.schema.map( ( { label, prop } = {} ) => {
                          return createElement( 'li',
                            { class:'column-block-expand-content-item' },
                            [
                              createElement( 
                                'div', 
                                { 
                                  domProps:{
                                    innerHTML: label
                                  },
                                  class:'content-item-label' 
                                }
                              ),
                              createElement( 
                                'div', 
                                { 
                                  class: 'content-item-value',
                                  domProps:{
                                    innerHTML:  current[ prop ]
                                  }
                                }
                              )
                            ] );
                        } )
                      );
                    }
                  }
                }

              ),

              /* 数据列 */
              ...this.schema.map( ( columnConf = {} ) => {

                /* 闭包保存组件的查询栏显示状态 */
                const queryItem = createQueryItem();

                /* 递归 多级表头 */
                const recursion = ( current ) => { 
                  const {
                    label,
                    prop,
                    width,
                    align,
                    className,
                    fixed,
                    children = []
                  } = current;
                  return  createElement(
                    'TableColumnComponent',
                    {
                      props: {
                        label,
                        prop: prop,
                        showOverflowTooltip: true,
                        width,
                        align,
                        className,
                        fixed,
                        'show-overflow-tooltip': true
                      },

                      scopedSlots: {

                        /* 表头插槽 */
                        header: ( props ) => {
                          return createElement(
                            'div',
                            {
                              class: 'column-block'
                            },
                            [
                              createElement(
                                'div',
                                {
                                  domProps: {
                                    innerHTML: label
                                  }
                                }
                              ),
                              queryItem.call( this, createElement, columnConf )
                            ]
                          );
                        },
                        default: ( currentData = {} ) => {
                          const { row } = currentData;

                          /* 每个字段都可有插槽 */
                          const currentScoped = this.$scopedSlots[ prop ];
                          return createElement(
                            'div',
                            currentScoped ? currentScoped( currentData.row ) : row[ prop ]
                          );
                        }
                      }
                    },

                    /* 多级表头 */
                    children.map( cItem => recursion( cItem ) )
                  );
                };
                return recursion( columnConf );
              } )
            ]
          )
        ]
      );
    } catch ( error ) {
      console.log( error );
      return createElement( 'div', '页面渲染错误' );
    }
  }
};
