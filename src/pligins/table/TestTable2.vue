<!--
 * @Author: your name
 * @Date: 2020-07-11 23:41:03
 * @LastEditTime: 2020-07-11 23:47:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/pligins/table/TestTable2.vue
-->
<template>
  <vxe-grid
    border
    resizable
    keep-source
    ref="xGrid"
    height="530"
    id="toolbar_demo_2"
    :loading="loading"
    :custom-config="tableCustom"
    :data="tableData"
    :columns="tableColumn"
    :toolbar="tableToolbar"
    :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
  >
    <template v-slot:toolbar_buttons>
      <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>
      <vxe-button status="primary" @click="loadData">搜索</vxe-button>
      <vxe-button @click="loadData">刷新</vxe-button>
      <vxe-button @click="insertEvent">新增</vxe-button>
      <vxe-button @click="saveEvent">保存</vxe-button>
      <vxe-button @click="$refs.xGrid.exportData()">导出.csv</vxe-button>
    </template>
  </vxe-grid>
</template>
<script>
const schema = [
  { label: '姓名', key: 'name', width: '100', /* 固定定位 */ fixed: 'left' },
  { label: '性别', key: 'sex', width: '200' },
  { label: '年龄', key: 'age', width: '1300', /* 启用排序 */ sortable: true },
  { label: '地址', key: 'address', width: '200' }
];
const list = [
  {
    name: '123asdkjlasjfsn dnjsdhfjksdjs',
    sex: '男',
    age: 19,
    address: '草铺'
  },
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
export default {
  data() {
    return {
      searchName: '',
      loading: false,
      tableData: [],
      tableCustom: {
        storage: true
      },
      tableToolbar: {
        custom: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        {
          title: '分类',
          children: [
            {
              field: 'nickname',
              title: 'Nickname',
              editRender: { name: 'input' }
            },
            {
              title: '子类',
              children: [
                { field: 'role', title: 'Role', editRender: { name: 'input' } }
              ]
            }
          ]
        },
        {
          field: 'describe',
          title: 'Describe',
          showOverflow: true,
          editRender: { name: 'input' }
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      setTimeout( () => {
        // this.tableData = window.MOCK_DATA_LIST.slice( 0, 15 );
        this.loading = false;
      }, 100 );
    },
    insertEvent() {
      this.$refs.xGrid.insert( {
        name: 'xxx'
      } );
    },
    saveEvent() {
      setTimeout( () => {
        const {
          insertRecords,
          removeRecords,
          updateRecords
        } = this.$refs.xGrid.getRecordset();
        this.$XModal.message( {
          message: `新增 ${insertRecords.length} 条，删除 ${removeRecords.length} 条，更新 ${updateRecords.length} 条`,
          status: 'success'
        } );
        this.loadData();
      }, 100 );
    }
  }
};
</script>
