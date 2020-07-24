<!--
 * @Author: huangyuhui
 * @since: 2020-07-15 17:52:19
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-16 16:22:18
 * @message: 
 * @FilePath: \supply-chain-system\src\pligins\table\README.md
--> 
# 表格公共组件

## 1、props 参数

  - ### 1.1 -
  
    | 参数 | 说明 | 类型  | 可选值 | 默认值 | 备注 |
    | :-----| :----: | :----: | :----: | :----: | :----: |
    | align | 布局方式 | string  | left \| center \| right | left | - |
    | size | 表格尺寸 | string   | medium \| small \| mini | small | - |
    | total | 分页数据总条数 | number | - | 0 | - |
    | rowContentButtons | 表格行数据操作按钮schema | Array< { label: 显示的文字, code: 当前按钮的code } > | - | - | - |
    | loading | 加载状态 | boolean | - | false | - |
    | isJoinSeq | 是否启用序号 | boolean | - | true | - |
    | height | 表格容器高度 | string | - | - | - |
    | list | 表格列表数据集合 | Array< { } > | - | - | - |
    | schema| 表格配置 | Array< { } > | - | - | 查看以下代码 |

  - ###  1.2 schame item 详解：
    | 参数 | 说明 | 类型  | 可选值 | 默认值 | 备注 |
    | :-----| :----: | :----: | :----: | :----: | :----: |
    | label | 表头列文字 | string | - | - | 必填 |
    | key | 列绑定数据的字段名 | string | - | - | 必填 |
    | width | 列的宽度 | string | - | - | - |
    | fixed | 固定列 | string | left \| right | - | - |
    | visible| 是否显示隐藏列 | boolean | - | true | - |
    | sortable | 列是否启用排序 | boolean | - | - | - |
    | filter | 列头筛选集合 | object | - | - | 查看以下代码 |


  - ### 1.3 schame filter 列筛选 详解：
    | 参数 | 说明 | 类型  | 可选值 | 默认值 | 备注 |
    | :-----| :----: | :----: | :----: | :----: | :----: |
    | type | 输入框类型 | string | string \| date \| checkbox \| select | - | 必填 |
    | data | 输入框默认值 | any | - | - | - |
    | checked| 是否默认选中筛选 | boolean | - | - | - |
    | selectOptions | 下拉选项集合 | Array<{ label: '下拉1', value: '1' }> | - | - | - |
    | checkboxOptions | 复选框选项集合 | Array<{ label: '复选框1', value: '1' }> | - | - | - |

***

## 2、Events 事件
| 事件名称 | 说明 | 回调参数 
| :-----| :----: | :----: |
| handleToolbarEvent | 行操作按钮点击事件 | ( { currentData: 当前行的数据 ,currentType: 当前点击按钮的类型, event: 点击对象 } )
| handlePageChange | 分页事件，pageSize或pageIndex改变时触发 | ( { pageIndex: 当前页数, pageSize: 每页显示个数 } )
| handleColumnSort |  点击列头排序事件 | ( { field: 当前点击列的字段名, order: 排序类型 asc \| null \| desc, event } )
| handleCheckboxChange | 点击多选框事件 | ( { data: 选中数据的集合 Array<{}>, event } )
| handleColumnFilter | 点击列头筛选事件 | ( { [ filed ]: any } )
| handleRefresh |  点击表格工具栏右边的刷新事件 | -
| handleClickRow | 点击表格行事件 | ( { data: 当前行数据, event } )


***

## 3、Slot 插槽

| 插槽名称 | 说明 | 插槽参数 
| :-----| :----: | :----: |
| toolbarButtons | 工具栏按钮插槽 | {currentRow： 当前点击行的数据 }
| 列的字段名| 自定义列的 插槽 | {current： 当前字段的值 }
