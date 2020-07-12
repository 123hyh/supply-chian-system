<!--
 * @Author: your name
 * @Date: 2020-07-12 00:39:30
 * @LastEditTime: 2020-07-12 00:53:25
 * @LastEditors: Please set LastEditors
 * @Description: 分页条
 * @FilePath: /supply-chian-system/src/pligins/table/Page.vue
-->
<template>
  <vxe-pager
    border
    size="medium"
    :loading="loading"
    :current-page="page.pageIndex"
    :page-size="page.pageSize"
    :total="total"
    :layouts="[
      'PrevPage',
      'JumpNumber',
      'NextPage',
      'FullJump',
      'Sizes',
      'Total',
    ]"
    @page-change="handlePageChange"
  >
  </vxe-pager>
</template>
<script>
export default {
  name: 'page-component',
  props: {
    /* 数据总条目数 */
    total: {
      type: Number,
      default: 10000
    },
    /* 分页条状态 */
    loading: {
      type: Boolean,
      default: false
    }
  },
  /* 分页条数据 */
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  methods:{
    /**
     * 点击分页事件
     * @description: 
     * @param {type} 
     * @return: 
     */
    get handlePageChange() {
      let prevPageParams = {};
      return function( { currentPage:pageIndex = 1, pageSize = 10 } = {} ) {
        const page = this.page;
        // 当pageSize变化时, pageIndex 重置 为 第一页 
        if ( 
          pageSize !== prevPageParams.pageSize &&  
          prevPageParams.pageSize !== undefined
        ) {
          pageIndex = 1;
        }
        prevPageParams = JSON.parse( JSON.stringify( page ) );
        page.pageIndex = pageIndex,
        page.pageSize = pageSize;
        this.$emit( 'handlePageChange', { ...this.page } );
      };
    } 
  }
};
</script>
