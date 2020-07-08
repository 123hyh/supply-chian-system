<!--
 * @Author: your name
 * @Date: 2020-07-08 23:40:10
 * @LastEditTime: 2020-07-08 23:59:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/pligins/TestTable.vue
-->
<template>
  <vxe-table
    :height='height'
    class="table-scrollbar"
    border
    show-header-overflow
    show-overflow
    resizable
    highlight-hover-row
    :align="allAlign"
    :data="tableData"
  >
    <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
    <vxe-table-column field="name" title="Name"></vxe-table-column>
    <vxe-table-column field="sex" title="Sex"></vxe-table-column>
    <vxe-table-column field="age" title="Age"></vxe-table-column>
    <vxe-table-column field="address" title="Address"></vxe-table-column>
  </vxe-table>
</template>
<script>
export default {
  props:{
    height:{
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      allAlign: null,
      tableData: []
    };
  },
  created() {
    this.tableData = [
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' },
      { name: 'hyh', sex: '男', age: 19, address: '草铺' }
    ];
  }
};
</script>
<style lang="scss">
/*滚动条整体部分*/
.table-scrollbar div::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.table-scrollbar div::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.table-scrollbar div::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.table-scrollbar div::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.table-scrollbar div::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.table-scrollbar div::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>
