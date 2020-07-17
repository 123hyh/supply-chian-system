/*
 * @Author: huangyuhui
 * @since: 2020-07-17 16:56:35
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-17 18:24:33
 * @message: 
 * @FilePath: \supply-chain-system\src\pligins\TestTableTwo.js
 */
import { Table, TableColumn } from 'element-ui';
export default {
  components: {
    TableComponent: Table,
    TableColumnComponent: TableColumn
  },
  props: {

    /* 表格配置 */
    schema: {
      type: Array,
      default: () => ( [
        { label: '姓名', key: 'name', width: 100, sortable: true, query: { type: 'string' } },
        { label: '年龄', key: 'age' }
      ] )
    }

  },
  data () {
    return {

      /* 当前点中行数据 */
      currentRowData: {}
    };
  },
  methods: {

    /* 点击列排序事件 */
    handlerColumnSort ( { column, prop, order } = {} ) {
      this.$emit( 'handColumnSort', { filed: prop, data: order } );
    }
  },
  render ( createElement ) {
    return createElement(
      'div',
      [
        createElement(
          'TableComponent',
          {
            props: {
              data: [
                { name: 'hyhhyh', age: 18 },
                { name: 'hyh', age: 18 }
              ],
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
                label: '序号'
              }
            } ),

            /* 选择列 */
            createElement( 'TableColumnComponent', {
              props: {
                type: 'selection'
              }
            } ),

            /* 数据列 */
            ...this.schema.map( ( columnConf = {} ) => {
              const { label, key, width, align, className, sortable = false, fixed } = columnConf;
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
                    sortable: sortable ? 'custom' : false,
                    fixed
                  },

                  scopedSlots: {

                    /* 表头插槽 */
                    header ( props ) {
                      return createElement(
                        'div',
                        props.column.label
                      );
                    },
                    default: ( currentData = {} ) => {
                      const { row } = currentData;

                      /* 每个字段都可有插槽 */
                      const currentScoped = this.$scopedSlots[ key ];
                      return createElement(
                        'div',
                        currentScoped ? currentScoped( currentData ) : row[ key ]
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
  }
};