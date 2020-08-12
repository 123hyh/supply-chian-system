let _cid = 0;
const cacheTable = new Map();
import Vue from 'vue';
import { cloneDeepWith, debounce } from 'lodash';

export function useTable ( params ) {

  let cid = _cid++;
  let currentVm = null;

  /* 当前表格配置 */
  const currentConfig = Vue.observable( cloneDeepWith( params )  );

  /* 保存配置 */
  cacheTable.set( cid, { config: currentConfig } );
  
  return Object.freeze( {

    /**
     * 当前组件 use id
     * @param {type} 
     * @return {type} 
     */
    get _cid () {
      return cid;
    },

    /**
     * 内部使用
     * @param {*} vm Vue组件实例
     */
    _setVm ( vm ) {
      if ( vm.$options._isComponent ) {
        currentVm = vm;
      }
    },

    /**
     * 点击一行数据事件
     * @param {Function} 需要订阅的回调
     * @return {Function} 返回 off 事件方法
     */
    onClickRow ( handler = () => void 1 ) {
      currentVm.$on( 'handClickRow', handler );
      return () => currentVm.$off( 'handClickRow', handler );
    },

    /**
     * 点击多选框事件
     * @param {Function} 需要订阅的回调
     * @return {Function} 返回 off 事件方法
     */
    onSelection ( handler = () => void 1  ) {
      currentVm.$on( 'handSelection', handler );
      return () => currentVm.$off( 'handSelection', handler );
    },

    /**
     * 双击事件
     * @param {Function} 需要订阅的回调
     * @return {Function} 返回 off 事件方法
     */
    onRowDblclick ( handler = () => void 1  ) {
      currentVm.$on( 'handRowDblclick', handler );
      return () => currentVm.$off( 'handRowDblclick', handler );
    },

    /**
     * 查询列表数据事件
     * @param {Function} 需要订阅的回调
     * @return {Function} 返回 off 事件方法
     */
    onFindList ( handler = () => void 1 ) {
      currentVm.$on( 'handFindList', handler );
      return () => currentVm.$off( 'handFindList', handler );
    }
  } );
}

import Table from '@/plugins/TableJsx/index.js';
import queryBar from '@/plugins/TableJsx/queryBar/queryBar.js';

export default {

  /* 标识为组件 */
  get _isComponent () {
    return true;
  },

  components: {
    XyTable: Table,
    queryBar
  },

  created () {
    this.table._setVm( this );
  },

  beforeDestroy () {
    const cid = this.table._cid;
    cacheTable.delete( cid );
  },

  props: {
    size: {
      type: String,
      default: 'small'
    },

    /* useTable 返回值 */
    table: {
      type: Object,
      required: true
    },

    /* 自定义样式类名称 */
    className: {
      type: String,
      default: ''
    }
  },

  render ( h ) {
    const cid = this.table._cid;
    const { config:{ tableConfig } } = cacheTable.get( cid );
    return h(
      'div',
      {
        class: [ 
          'xy-table-box',
          this.className 
        ]
      },
      [

        /* 查询栏组件 */
        h(
          'queryBar',
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
              schema: tableConfig,

              /* 统计行数据 */
              summaryMethod () {
                return [ '', '', '', '统计', '', '', '', 111122233 ];
              }
            },

            /* 表格跨级插槽, 插槽名必须是 table.[name] 格式 */
            scopedSlots: Object.keys( this.$scopedSlots ).reduce( 
              ( prev, slotName ) => {
                if ( /^table\./.test( slotName ) ) {
                  const name =   slotName.replace( /^table\./, '' );
                  prev[ name ] = this.$scopedSlots[ slotName ];
                }
                return prev;
              },
              {}
            ),
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