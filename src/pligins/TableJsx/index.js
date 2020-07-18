/*
 * @Author: huangyuhui
 * @since: 2020-07-17 16:56:35
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-17 18:24:33
 * @message: 表格公共组件
 * @FilePath: \supply-chain-system\src\pligins\TestTableTwo.js
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

    /* 表格配置 */
    schema: {
      type: Array,
      default: () => ( [
        {
          label: '姓名',
          key: 'name',
          width: 300,
          sortable: true,
          searchType: 'string'
        },
        {
          label: '年龄',
          key: 'age'
        },
        {
          label: '性别',
          key: 'sex',

          /* 查询表单类型 */
          searchType: 'select',

          /* 查询栏选项 */
          options: [ { label: '男', value: 1 }, { label: '女', value: 0 } ]
        },
        {
          label: '出生',
          key: 'createTime',
          searchType: 'date'
        },
        {
          label: '入职时间',
          key: 'entryTime'
        }
      ] )
    },
    list: {
      type: Array,
      default: () => ( [
        { name: 'mff', age: 18, createTime: '1993-09-01', entryTime: '2019-02-25', sex: 0 },
        { name: 'hyh', age: 18, createTime: '1999-09-01', entryTime: '2020-6-30', sex: 1 }
      ] )
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
                size: 'small',
                highlightCurrentRow: true,
                border: true
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
                        this.schema.map( ( { label, key } = {} ) => {
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
                                    innerHTML:  current[ key ]
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
                const {
                  label,
                  key,
                  width,
                  align,
                  className,
                  fixed
                } = columnConf;

                /* 闭包保存组件的查询栏显示状态 */
                const queryItem = createQueryItem();

                return createElement(
                  'TableColumnComponent',
                  {
                    props: {
                      label,
                      prop: key,
                      showOverflowTooltip: true,
                      width,
                      align,
                      className,
                      fixed
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
                        const currentScoped = this.$scopedSlots[ key ];
                        return createElement(
                          'div',
                          currentScoped ? currentScoped( currentData.row ) : row[ key ]
                        );
                      }
                    }
                  }
                );
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
