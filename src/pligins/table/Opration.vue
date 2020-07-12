<!--
 * @Author: your name
 * @Date: 2020-07-12 12:22:57
 * @LastEditTime: 2020-07-12 12:49:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/pligins/table/Opration.vue
-->
<template>
  <div>
    <XyButton
      icon="el-icon-edit-outline"
      circle
      size="small"
      v-for="btnItem in buttons"
      :key="btnItem.code"
      :disabled="currentData | oprationDisable"
      :title="btnItem.label"
      @click.stop="
        (e) =>
          handlerToolbarEvent({
            currentType: btnItem.code,
            event: e,
            currentData,
          })
      "
    />
    <!-- <vxe-button
      v-for="btnItem in buttons"
      size="mini"
      icon="el-icon-delete"
      :disabled="currentData | oprationDisable"
      :key="btnItem.code"
      :status="btnItem.type"
      >{{ btnItem.label }}</vxe-button
    > -->
  </div>
</template>
<script>
import { Button } from 'element-ui';
export default {
  components: {
    XyButton: Button
  },
  props: {
    currentData: {
      type: Object,
      default: () => ( {} )
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    /* 操作按钮禁用状态 */
    oprationDisable( currentData = {} ) {
      const { row = {} } = currentData;
      return !!row.status;
    }
  },
  methods: {
    /**
     * 点击左部按钮事件
     * @description:
     * @param {type}
     * @return:
     */
    handlerToolbarEvent( currentTarget ) {
      this.$emit( 'handlerClickToolbarEvent', currentTarget );
    }
  }
};
</script>
