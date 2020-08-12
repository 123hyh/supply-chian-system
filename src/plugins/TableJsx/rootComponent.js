let _cid = 0;
const cacheTable = new Map();

export function useTable ( params ) {

  let cid = _cid++;
  let currentVm = null;

  return Object.freeze( {

    /* 当前表格组件id */
    get _cid () {
      return cid;
    },

    _init ( vm ) {
      currentVm = vm;
    },

    /* 点击一行数据事件 */
    onClickRow ( handler = () => void 1 ) {
      currentVm.$on( 'handClickRow', handler );
    },

    /* 点击多选框事件 */
    onSelection ( handler = () => void 1 ) {
      currentVm.$on( 'handSelection', handler );
    },

    /* 双击事件 */
    onRowDblclick ( handler = () => void 1 ) {
      currentVm.$on( 'handRowDblclick', handler );
    },

    /* 查询列表数据事件 */
    onFindList ( handler = () => void 1 ) {
      currentVm.$on( 'handFindList', handler );
    }
  } );
}

import Table from '@/plugins/TableJsx/index.js';
import queryBar from '@/plugins/TableJsx/queryBar/queryBar.js';

export default {

  components: {
    XyTable: Table,
    queryBar
  },

  created () {
    const cid = this.table._cid;
    cacheTable.set( cid, this );
    this.table._init( this );
  },

  props: {
    size: {
      type: String,
      default: 'small'
    },
    
    table: {
      type: Object,
      required: true
    },

    /* 样式类名称 */
    className: {
      type: String,
      default: ''
    }
  },

  render ( h ) {
    return h(
      'div',
      {
        class: [ 'xy-table-box', this.className ]
      },
      [

        /* 查询栏组件 */
        h(
          queryBar,
          {
            props: {
              size: this.size
            },
            on: {
              handFindList: ( ...args ) => {
                this.$emit( 'handFindList', ...args );
              }
            }
          }
        ),

        /* 表格主体 */
        h(
          'XyTable',
          {

            props: {
              size: this.size,

              /* 统计行数据 */
              summaryMethod () {
                return [ '', '', '', '统计', '', '', '', 111122233 ];
              }
            },

            on: {

              /* 查询事件 */
              handFindList: ( ...args ) => {
                console.log( this );
                this.$emit( 'handFindList', ...args );
              },

              /* 点击一行数据 */
              handClickRow: ( ...args ) => {
                this.$emit( 'handClickRow', ...args );
              },

              /* 勾选事件 */
              handSelection: ( ...args ) => {
                this.$emit( 'handSelection', ...args );
              },

              /* 双击一行数据 */
              handRowDblclick: ( ...args ) => {
                this.$emit( 'handRowDblclick', ...args );
              }
            }
          }
        )
      ]
    );
  }
};