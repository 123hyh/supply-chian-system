<!--
 * @Author: huangyuhui
 * @since: 2020-07-22 15:18:23
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-22 15:59:00
 * @message: 
 * @FilePath: \supply-chain-system\src\pligins\TableJsx\spec.vue
--> 
<template>
  <TableJsx 
    :summaryMethod="handlerSummary"
    @handFindList="handFindList"
    @handClickRow="handClickRow"
    @handSelection="handSelection"
    @handRowDblclick="handRowDblclick"
    >
    <template v-slot:sex="{sex}">
      <div>
        {{ sex === 1 ? '男':'女' }}
      </div>
    </template>
  </TableJsx>
</template>

<script>
import TableJsx from '@/pligins/TableJsx/index.js';
export default {
  components:{
    TableJsx
  },
  methods: {

    /* 查询事件 */
    handFindList () {
      debugger;
    },

    /* 统计数据 */
    handlerSummary ( ...args ) {
      return [ '', '', '', '统计', '', '', '', 111122233 ];
    },

    /* 点击一行数据 */
    handClickRow () {
      console.log( '点击一行数据', ...arguments );

    },

    /* 勾选事件 */
    handSelection () {
      console.log( '勾选', ...arguments );
    },

    /* 双击一行数据 */
    handRowDblclick () {
      console.log( '双击', ...arguments );

    }
  }
};
</script>

<style>

</style>