<!--
 * @Author: huangyuhui
 * @since: 2020-07-22 15:18:23
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-22 15:59:00
 * @message: 
 * @FilePath: \supply-chain-system\src\pligins\TableJsx\spec.vue
-->
<template>
  <div>
    <!-- tools-bar -->
    <div class="tools-bar">
      <!-- 筛选表格 -->
      <!-- <Dropdown trigger="click">
        <XyButton
          size="small"
          icon="el-icon-s-grid"
          />
        <DropdownMenu slot="dropdown">
          <DropdownItem>1</DropdownItem>
          <DropdownItem>1</DropdownItem>
          <DropdownItem>1</DropdownItem>
        </DropdownMenu>
      </Dropdown> -->
      <!-- 导出表格 -->
      <!--  <Dropdown trigger="click">
        <XyButton
          size="small"
          icon="el-icon-download"
          />
        <DropdownMenu slot="dropdown">
          <DropdownItem>.cvs</DropdownItem>
          <DropdownItem>.text</DropdownItem>
          <DropdownItem>.doc</DropdownItem>
          <DropdownItem>.xlsx</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <TableJsx
      :summaryMethod="handlerSummary"
      @handFindList="handFindList"
      @handClickRow="handClickRow"
      @handSelection="handSelection"
      @handRowDblclick="handRowDblclick"
      >
      <template v-slot:sex="{ sex }">
        <div>
          {{ sex === 1 ? "男" : "女" }}
        </div>
      </template>
    </TableJsx> -->

      <h1><hr></h1>
    
      <rootComponent :table="table">
        <div>123</div>
      </rootComponent>
    </div>
  </div>
</template>

<script>
import TableJsx from '@/plugins/TableJsx/index.js';
import { Dropdown, DropdownMenu, DropdownItem, Button } from 'element-ui';
import rootComponent, { useTable } from '@/plugins/TableJsx/rootComponent.js';

export default {
  components: {

    /* TableJsx,
    XyButton: Button,
    Dropdown,
    DropdownMenu,
    DropdownItem, */
    rootComponent
  },
  data () {
    return {
      table: useTable( {
        tableConfig: [
          {
            label: '姓名',
            prop: 'name',
            width: 300,
            sortable: true,
            searchType: 'string'
          },
          {
            label: '年龄',
            prop: 'age'
          },
          {
            label: '性别',
            prop: 'sex',

            /* 查询表单类型 */
            searchType: 'select',

            /* 查询栏选项 */
            options: [ { label: '男', value: 1 }, { label: '女', value: 0 } ]
          },
          {
            label: '出生',
            prop: 'createTime',
            searchType: 'date'
          },
          {
            label: '入职时间',
            prop: 'entryTime'
          },
          {
            label: '地址',
            prop: 'addess',
            children:[
              {
                label: '省',
                prop: 'province',
                children:[
                  {
                    label:'测试3',
                    prop: 'test3'
                  }
                ]
              },
              {
                label: '市',
                prop: 'city'
              },
              {
                label: '区',
                prop: 'district'
              }
            ]
          }
        ]
      } )
    };
  },
  mounted () {
    this.table.onClickRow( ( e ) => {
      console.log( '点击当前组件' );
    } );
    this.table.onSelection( ( e ) => {
      console.log( '点击勾选框' );
    } );
    this.table.onFindList( ( e ) => {
      debugger;
    } );
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

<style></style>
