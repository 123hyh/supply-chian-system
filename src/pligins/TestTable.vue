<!--
 * @Author: your name
 * @Date: 2020-07-08 23:40:10
 * @lastTime: 2020-07-13 18:17:40
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\pligins\TestTable.vue
-->

<template>
  <div class="xy-component-table">
    <!-- 查询栏 - 工具栏 -->
    <QueryBar :connectRef="currentRefTable">
      <template v-slot>
        <!-- 查询 按钮插槽 -->
        <slot name="QueryBarBtns"/>
      </template>
    </QueryBar>

    <!-- 表格主体 -->
    <vxe-table
      ref="table"
      :size="size"
      :height="height"
      :loading="loading"
      :align="allAlign"
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
      :filterConfig="{remote: true}"
      @sort-change="sortChangeEvent"
      @checkbox-change="handlerCheckboxChange"
      @filter-change="handlerFilterData"
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
        v-for="item in schema"
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
              <template v-if="item.type ==='string'">
                <vxe-input
                  :key="`${item.key}-string-${index}}`"
                  v-model="option.data"
                  placeholder="请输入关键字"
                  :type="item.filters[index].type"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  />
              </template>
              <!-- 下拉选择 -->
              <template v-else-if="item.type ==='select'">
                <vxe-select
                  :key="`${item.key}-select-${index}}`"
                  v-model="option.data"
                  placeholder="请选择选项"
                  :options="item.selectOptions"
                  clearable
                  @input="$panel.changeOption($event, !!option.data, option)"
                  >
                  <vxe-option
                    v-for="(current,oIndex) in item.selectOptions"
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
                    v-for="(currentOption,oIndex) in item.checkboxOptions"
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
  </div>
</template>
<script>
import Vue from 'vue';

const schema = [
  {
    label: '姓名',
    key: 'name',
    width: '100',
    /* 固定定位 */ fixed: 'left',
    /* 表单类型 */
    type: 'select',
    /* 下拉选项 */
    selectOptions: [
      { label: '很遗憾1', value: '1' },
      { label: '很遗憾2', value: '2' }
    ],
    filters: [
      {
        /* 初始值 */
        data: '',
        /* 是否默认选中 */
        checked: false
      }
    ]
  },
  {
    label: '性别',
    key: 'sex',
    width: '200',
    type: 'checkbox',
    checkboxOptions: [
      { label: '男', value: 0 },
      { label: '女', value: 1 },
      { label: '中', value: 2 }
    ],
    filters: [ { data: [], checked: false } ]
  },
  {
    label: '年龄',
    key: 'age',
    width: '1300',
    /* 启用排序 */ sortable: true,
    type: 'date',

    filters: [
      {
        /* 初始值 */
        data: '',
        /* 是否默认选中 */
        checked: false
      }
    ]
  },
  { label: '地址', key: 'address', width: '200', /* 隐藏列 */ visible: false }
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
import QueryBar from '@/pligins/table/ToolBar/QueryBar.vue';
export default {
  name: 'XyComponentTable',
  components: {
    Page,
    Opration,
    QueryBar
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
      allAlign: 'center',
      /* 标签表格 */
      currentRefTable: {},
      // 表头过滤筛选form数据集合
      columnFilterFormData: {} 
    };
  },
  mounted() {
    this.currentRefTable = this.$refs.table;
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
      this.$emit( 'handlerColumnSort', /* 传递 当前字段，排序参数 */{
        field,
        order,
        event
      } );
    },

    /**
     * 点击多选框事件
     * @description:
     * @param {type}
     * @return:
     */
    handlerCheckboxChange( clickCurrent = {}, event ) {
      const { row = {} } = clickCurrent;
      this.$emit( 'handleCheckboxChange', /* 传递 当前你点击行 数据 */{ event, current: row } );
    },

    /**
     * 列 筛选事件
     * @description:
     * @param {type}
     * @return:
     */
    handlerFilterData( ...args ) {
      const [ { filters = [] } = {} ] = args;
      let data = filters.reduce( ( prev, { prop, datas = [] } = {} ) => {
        prev[prop] =  datas.join() ;

        // 删除空参数
        prev[prop] === '' &&  delete prev[prop];

        return prev;
      }, {} );
      this.$emit( 'handlerColumnFilter', /* 传递 查询参数 */ data );
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
      padding: 10px;
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
