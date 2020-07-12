<!--
 * @Author: your name
 * @Date: 2020-07-08 23:40:10
 * @LastEditTime: 2020-07-12 20:57:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/pligins/TestTable.vue
-->
<template>
  <div class="xy-component-table">
    <!-- 工具栏 -->
    <vxe-toolbar
      size="medium"
      :loading="loading"
      custom
      :perfect="true"
      :refresh="{ query: handlerRefresh }"
    >
      <template v-slot:buttons>
        <!-- 左侧按钮 -->
        <LeftTools :buttons="leftButtons" />
      </template>
    </vxe-toolbar>

    <vxe-table
      :size="size"
      :height="height"
      :loading="loading"
      :align="allAlign"
      :data="list"
      border
      round
      show-header-overflow
      show-overflow
      resizable
      highlight-hover-column
      highlight-current-column
      highlight-hover-row
      highlight-current-row
      class="table-scrollbar"
      @sort-change="sortChangeEvent"
      @checkbox-change="handlerCheckboxChange"
    >
      <!-- 序号列 -->
      <vxe-table-column
        v-if="isJoinSeq"
        type="seq"
        title="序号"
        width="60"
        fixed="left"
      ></vxe-table-column>

      <!-- 多选框 -->
      <vxe-table-column
        type="checkbox"
        width="60"
        fixed="left"
      ></vxe-table-column>

      <vxe-table-column
        v-for="item in schema"
        :key="item.key"
        :field="item.key"
        :title="item.label"
        :width="item.width"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :visible='item.visible'
        show-overflow
      ></vxe-table-column>
      <!-- 右侧操作按钮 -->
      <vxe-table-column
        v-if="rowContentButtons.length"
        title="操作"
        fixed="right"
        :width="rowContentButtons.length * 100 - rowContentButtons.length * 20"
      >
        <template v-slot="data">
          <Opration
            :currentData="data"
            :buttons="rowContentButtons"
            @handlerToolbarEvent="(data) => $emit('handlerToolbarEvent', data)"
          />
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页条 -->
    <Page
      :key="`xy-component-page-${total}`"
      :total="total"
      @handlePageChange="(data) => $emit('handlePageChange', data || {})"
    />
    <!-- 测试插槽 -->
    <test>
      <div>测试jsx插槽</div>
      <template v-slot:header="{ text }">
        <div>{{ text }}</div>
      </template>
    </test>
  </div>
</template>
<script>
const schema = [
  { label: '姓名', key: 'name', width: '100', /* 固定定位 */ fixed: 'left' },
  { label: '性别', key: 'sex', width: '200' },
  { label: '年龄', key: 'age', width: '1300', /* 启用排序 */ sortable: true },
  { label: '地址', key: 'address', width: '200', /* 隐藏列 */visible: false }
];
const list = [
  {
    name: '123asdkjlasjfsn dnjsdhfjksdjs',
    sex: '男',
    age: 19,
    address: '草铺'
  },
  { name: 'hyh', sex: '男', age: 19, address: '草铺', status: '0' },
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
import Page from '@/pligins/table/Page.vue';
import Opration from '@/pligins/table/Opration.vue';
import LeftTools from '@/pligins/table/ToolBar/LeftTools.vue';
export default {
  name: 'xy-component-table',
  components: {
    Page,
    LeftTools,
    Opration,
    test: () => import( '@/pligins/table/TestTable2.vue' )
  },

  props: {
    total: {
      type: Number,
      default: 0
    },
    /* 左部按钮集合 */
    leftButtons: {
      type: Array,
      default: () => [
        {
          label: '查询',
          type: 'primary',
          code: 'search'
        },
        { label: '新增', code: 'insert' },
        { label: '保存', code: 'save' }
      ]
    },
    /* 表格行数据操作按钮 */
    rowContentButtons: {
      type: Array,
      default: () => [
        {
          label: '归类',
          code: 'classify'
        },
        { label: '编辑', code: 'edit' }
      ]
    },
    /* 表格加载状态 */
    loading: {
      type: Boolean,
      default: false
    },
    /* 是否启用序号 */
    isJoinSeq: {
      type: Boolean,
      default: true
    },
    /* 表格容器高度 */
    height: {
      type: String,
      default: '400px'
    },
    /* 列表数据 */
    list: {
      type: Array,
      default: () => list
    },
    /* 表格配置 */
    schema: {
      type: Array,
      default: () => schema
    },
    /* 表格尺寸 */
    size: {
      type: String,
      default: 'small',
      validator( val ) {
        const options = [ 'medium', 'small', 'mini' ];
        const isExist = options.includes( val );
        if ( !isExist ) {
          throw Error( '参数选项：medium | small | mini' );
        }
        return true;
      }
    }
  },
  data() {
    return {
      allAlign: 'center'
    };
  },
  methods: {
    /**
     * 点击表头字段排序事件
     * @description:
     * @param {type}
     * @return:
     */
    sortChangeEvent( currentClick, event ) {
      const { field, order } = currentClick;
      this.$emit( 'handlerClickSort', {
        field,
        order,
        event
      } );
    },
    /**
     * 点击工具栏刷新列表按钮
     * @description:
     * @param {type}
     * @return:
     */
    handlerRefresh() {
      this.$emit( 'handleRefresh' );
    },
    /**
     * 点击多选框事件
     * @description:
     * @param {type}
     * @return:
     */
    handlerCheckboxChange( clickCurrent = {}, event ) {
      const { row = {} } = clickCurrent;
      this.$emit( 'handleCheckboxChange', { event, current: row } );
    }
  }
};
</script>
<style lang="scss">
.xy-component-table {
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
  .vxe-toolbar {
    height: auto;
  }
}
</style>
