<!--
 * @Author: huangyuhui
 * @Date: 2020-07-08 23:40:10
 * @lastTime: 2020-07-15 18:07:25
 * @LastAuthor: huangyuhui
 * @Description: 表格公共组件
 * @FilePath: \supply-chain-system\src\pligins\TestTable.vue
-->

<template>
  <div
    class="xy-component-table"
    :data-table-id="$data.$$id"
    >
    <!-- 查询栏 - 工具栏 -->
    <Toolbar
      :connectRef="currentRefTable"
      @handleRefresh="handlerRefresh"
      >
      <template v-slot>
        <!-- 工具栏按钮插槽 -->
        <slot
          name="toolbarButtons"
          :currentRow="currentRow"
          />
      </template>
    </Toolbar>

    <!-- 表格主体 -->
    <vxe-table
      :key="`table-key-${componentKey}`"
      ref="table"
      :size="size"
      :height="height"
      :loading="loading"
      :align="align"
      :data="list"
      border
      round
      showHeaderOverflow
      showOverflow
      resizable
      highlightHoverColumn
      highlightCurrentColumn
      highlightHoverRow
      highlightCurrentRow
      class="table-scrollbar"
      :filterConfig="{ remote: true }"
      @sort-change="sortChangeEvent"
      @checkbox-change="handlerCheckboxChange"
      @checkbox-all="handlerCheckboxChange"
      @filter-change="handlerFilterData"
      @current-change="handlerClickCurrentRow"
      >
      <!-- 序号列 -->
      <vxe-table-column
        v-if="isJoinSeq"
        type="seq"
        title="序号"
        width="60"
        fixed="left"
        />

      <!-- 多选框 -->
      <vxe-table-column
        type="checkbox"
        width="60"
        fixed="left"
        />

      <vxe-table-column
        v-for="item in columnCombination"
        :key="item.key"
        :field="item.key"
        :title="item.label"
        :width="item.width"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :visible="item.visible"
        :filters="item.filters"
        remoteSort
        showOverflow
        filter
        >
        <template v-slot="current">
          <!-- 每个列对应都由插槽，插槽name 为 schema的 key -->
          <template v-if="$scopedSlots[item.key]">
            <slot
              :name="item.key"
              :current="current"
              />
          </template>
          <template v-else>
            <div>{{ current.row[item.key] }}</div>
          </template>
        </template>
        <!-- 过滤查询插槽 -->
        <template v-slot:filter="{ $panel, column }">
          <template v-if="item.filters">
            <!-- 筛选表单类型 -->
            <template v-for="(option, index) in column.filters">
              <!-- 文字输入 -->
              <template v-if="item.type === 'string'">
                <vxe-input
                  :key="`${item.key}-string-${index}}`"
                  v-model="option.data"
                  placeholder="请输入关键字"
                  :type="item.filters[index].type"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  />
              </template>
              <!-- 下拉选择 -->
              <template v-else-if="item.type === 'select'">
                <vxe-select
                  :key="`${item.key}-select-${index}}`"
                  v-model="option.data"
                  placeholder="请选择选项"
                  :options="item.selectOptions"
                  clearable
                  @input="$panel.changeOption($event, !!option.data, option)"
                  >
                  <vxe-option
                    v-for="(current, oIndex) in item.selectOptions"
                    :key="`${item.key}-option-${oIndex}`"
                    :value="current.value"
                    :label="current.label"
                    />
                </vxe-select>
              </template>
              <!-- 日期选择器 -->
              <template v-else-if="item.type === 'date'">
                <vxe-input
                  :key="`${item.key}-date-${index}}`"
                  v-model="option.data"
                  placeholder="请选择日期"
                  type="date"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  />
              </template>
              <!-- 复选框 -->
              <template v-else-if="item.type === 'checkbox'">
                <vxe-checkbox-group
                  :key="`${item.key}-checkbox-${index}}`"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  >
                  <vxe-checkbox
                    v-for="(currentOption, oIndex) in item.checkboxOptions"
                    :key="`checkbox-option-${oIndex}`"
                    :label="currentOption.value"
                    >
                    {{ currentOption.label }}
                  </vxe-checkbox>
                </vxe-checkbox-group>
              </template>
            </template>
          </template>
        </template>
      </vxe-table-column>

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
            @handlerToolbarEvent="(data) => $emit('handleToolbarEvent', data)"
            />
        </template>
      </vxe-table-column>
    </vxe-table>

    <!-- 分页条 -->
    <Page
      :key="`xy-component-table-${componentKey}-page-${total}`"
      :total="total"
      @handlePageChange="(data) => $emit('handlePageChange', data || {})"
      />
  </div>
</template>
<script>
import Vue from 'vue';

const schema = [
  {
    label: '姓名',
    key: 'name',
    width: '100',

    /* 固定定位 */
    fixed: 'left',

    filter: {

      /* 表单类型 */
      type: 'select',

      /* 下拉选项 */
      selectOptions: [
        { label: '很遗憾1', value: '1' },
        { label: '很遗憾2', value: '2' }
      ],

      /* 初始值 */
      data: '',

      /* 是否默认选中 */
      checked: false
    }
  },
  {
    label: '性别',
    key: 'sex',
    width: '200',

    filter: {
      type: 'checkbox',
      checkboxOptions: [
        { label: '男', value: 0 },
        { label: '女', value: 1 },
        { label: '中', value: 2 }
      ],
      data: [ 0, 1 ],
      checked: false
    }
  },
  {
    label: '年龄',
    key: 'age',
    width: '1300',

    /* 启用排序 */

    sortable: true,
    filter: {
      type: 'date',

      /* 初始值 */
      data: '',

      /* 是否默认选中 */
      checked: false
    }
  },
  {
    label: '地址',
    key: 'address',
    width: '200',

    /* 隐藏列 */
    visible: false
  }
];

const list = Vue.observable( [
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
] );

import Page from '@/pligins/table/Page.vue';
import Opration from '@/pligins/table/Opration.vue';
import Toolbar from '@/pligins/table/ToolBar/Toolbar.vue';

let id = 0;
export default {
  name: 'XyComponentTable',
  components: {
    Page,
    Opration,
    Toolbar
  },

  props: {

    /*分页数据总条数 */
    total: {
      type: Number,
      default: 0
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
      default: ''
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

    /* 表格尺寸 medium | small | mini */
    size: {
      type: String,
      default: 'small',
      validator ( val ) {
        const options = [ 'medium', 'small', 'mini' ];
        const isExist = options.includes( val );
        if ( !isExist ) {
          throw Error( '参数选项：medium | small | mini' );
        }
        return true;
      }
    },

    /* 表格 文字布局 left | center | right  */
    align: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {

      /* 重置组件的 key */
      componentKey: 1,

      /* 当前组件 */
      $$id: ( id += 1 ),

      /* 标签表格 */
      currentRefTable: {},

      /* 表头过滤筛选form数据集合 */
      columnFilterFormData: {},

      /* 当前选中的行 */
      currentRow: {}
    };
  },
  computed: {

    /* 处理 schema */
    columnCombination () {
      try {
        const types = {
          string: () => ( {} ),
          select: () => ( { selectOptions: [] } ),
          checkbox: () => ( { checkboxOptions: [] } )
        };

        const arr = [];
        for ( const { filter, ...option } of this.schema ) {
          let newItem = { ...option };
          if (
            Object.prototype.toString.call( filter ).slice( 8, -1 ) === 'Object'
          ) {
            const { type = 'string', checkboxOptions, selectOptions } = filter;

            /* 查找选项 */
            let op = {};
            switch ( type ) {
            case 'checkbox' :
              op = { checkboxOptions };
              break;
            case 'select' :
              op = { selectOptions };
            }

            /* 重新赋值item */
            newItem = { ...op, ...newItem, type, filters: [ filter ] };
          }
          arr.push( newItem );
        }
        return arr;
      } catch ( error ) {
        console.log( error );
        return [];
      }
    }
  },
  mounted () {
    this.currentRefTable = this.$refs.table;
  },
  methods: {

    /**
     * 点击表头字段排序事件
     * @description:
     * @param {type}
     * @return:
     */
    sortChangeEvent ( currentClick, event ) {
      const { field, order } = currentClick;
      this.$emit(
        'handleColumnSort',
        /* 传递 当前字段，排序参数 */ {
          field,
          order,
          event
        }
      );
    },

    /**
     * 点击多选框事件
     * @description:
     * @param {type}
     * @return:
     */
    handlerCheckboxChange ( clickCurrent = {}, event ) {
      const { selection = {} } = clickCurrent;
      this.$emit(
        'handleCheckboxChange',
        /* 传递 当前你点击行 数据 */ { event, current: selection }
      );
    },

    /**
     * 列 筛选事件
     * @description:
     * @param {type}
     * @return:
     */
    handlerFilterData ( ...args ) {
      const [ { filters = [] } = {} ] = args;
      let data = filters.reduce( ( prev, { prop, datas = [] } = {} ) => {
        prev[ prop ] = datas.join();

        // 删除空参数
        prev[ prop ] === '' && delete prev[ prop ];

        return prev;
      }, {} );
      this.$emit( 'handleColumnFilter', /* 传递 查询参数 */ data );
    },

    /**
     * 点击刷新表格
     * @description:
     * @param {type}
     * @return:
     */
    handlerRefresh () {
      this.componentKey += 1;
      this.$emit( 'handleRefresh' );

      // 刷新后重新赋值 ref 给querybar 管理 ，因为 ref 不是响应式
      this.$nextTick( () => {
        this.currentRefTable = this.$refs.table;
      } );
    },

    /**
     * 点击当前行事件
     * @description:
     * @param {type}
     * @return:
     */
    handlerClickCurrentRow ( current = {}, event ) {
      const { row = {} } = current;
      this.currentRow = { ...row };
      this.$emit( 'handleClickRow', { data: this.currentRow, event } );
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

  // 列 筛选样式
  .vxe-table--filter-wrapper {
    .vxe-table--filter-template {
      width: 300px;
      padding: 20px;
      // 复选框
      .vxe-checkbox-group {
        display: flex;
        flex-wrap: wrap;
        .vxe-checkbox {
          flex-basis: 100%;
          margin: 10px 0;
        }
      }
    }
  }

  .vxe-input--date-picker-suffix {
    height: 50%;
  }
}
</style>
