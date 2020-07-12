<!--
 * @Author: your name
 * @Date: 2020-07-12 15:09:45
 * @LastEditTime: 2020-07-12 16:50:42
 * @LastEditors: Please set LastEditors
 * @Description: 表格工具栏左侧操作组件
 * @FilePath: /supply-chian-system/src/pligins/table/ToolBar/LeftTools.vue
-->

<template>
  <div class="table-tool-left-tools">
    <QueryBar ref="queryBar">
      <div>
        <vxe-button
          v-for="btnItem in buttons"
          :key="btnItem.code"
          :status="btnItem.type"
          @click="
            ({ $event } = {}) =>
              handlerClickButton({
                currentType: btnItem.code,
                event: $event,
              })
          "
          >{{ btnItem.label }}</vxe-button
        >
      </div>
    </QueryBar>
  </div>
</template>
<script>
import QueryBar from '@/pligins/table/ToolBar/QueryBar.vue';
export default {
  name: 'LeftTools',
  components: {
    QueryBar
  },
  props: {
    /* 按钮schema */
    buttons: Array
  },
  methods: {
    handlerClickButton( target = {} ) {
      this.$emit( 'handleQueryBarClickEvent', {
        ...target,
        data: this.$refs.queryBar.formData
      } );
      this.$refs.queryBar.formData.x = 1;
    }
  }
};
</script>
<style lang="scss">
.table-tool-left-tools {
  display: flex;
}
</style>
