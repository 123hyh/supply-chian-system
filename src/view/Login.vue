<!--
 * @Author: your name
 * @Date: 2020-07-07 22:02:56
 * @lastTime: 2020-07-13 17:55:00
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\view\Login.vue
--> 
<template>
  <div>
    <h2>
      登录loginPage
    </h2>
    <button @click="handlerRefresh">
      刷新
    </button>
    <TestTable :key="`${componentKey}-1`">
      <!-- 测试 查询栏 按钮 插槽 -->
      <template v-slot:QueryBarBtns>
        <div>1234</div>
      </template>
      <!-- 测试表格列 字段 插槽 -->
      <template v-slot:age>
        <span>111</span>
      </template>
    </TestTable>
  </div>
</template>
<script>
import TestTable from '@/pligins/TestTable.vue';
export default {
  name: 'Login',
  components:{
    TestTable
  },
  data() {
    return {
      componentKey: 0
    };
  },
  methods:{
    handlerRefresh() {
      this.componentKey += 1;
    }
  }
};
</script>