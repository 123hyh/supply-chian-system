<!--
 * @Author: your name
 * @Date: 2020-07-12 15:22:52
 * @lastTime: 2020-07-15 15:21:34
 * @LastAuthor: huangyuhui
 * @Description: 表格顶部按钮
 * @FilePath: \supply-chain-system\src\pligins\table\ToolBar\Toolbar.vue
-->
<template>
  <vxe-toolbar
    ref="Toolbar"
    class="xy-component-toolbar"
    size="medium"
    :loading="loading"
    custom
    :perfect="true"
    :refresh="{ query: handlerRefresh }"
    >
    <!-- 操作按钮 插槽 -->
    <template v-slot:buttons>
      <div class="query-bar-buttons">
        <slot/>
      </div>
    </template>
  </vxe-toolbar>
</template>

<script>
import ToolbarButtons from '@/pligins/table/ToolBar/ToolbarButtons.vue';
export default {
  name: 'Toolbar',
  props: {

    loading: Boolean,

    /* 需关联的表格ref */
    connectRef: {
      type: Object,
      required: true
    }
  },

  mounted () {
    this.$watch( 'connectRef', {

      /**
       * 关联表格
       * @description: 
       * @param {type} 
       * @return: 
       */
      handler () {
        this.connectRef.connect( this.$refs.Toolbar );
      }
    } );
  },
  methods: {

    /**
     * 点击工具栏刷新列表按钮
     * @description:
     * @param {type}
     * @return:
     */
    handlerRefresh () {
      this.$emit( 'handleRefresh' );
    }
  }
};
</script>
<style lang="scss">
.xy-component-toolbar {
  padding: 5px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > .vxe-button--wrapper {
    display: flex;
    flex-wrap: wrap;
    > * {
      flex-basis: calc(25% - 0.4em);
      margin: 0.2em;
      .vxe-input--inner {
        border-radius: 0;
      }
    }
  }
}
</style>
