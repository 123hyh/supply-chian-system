<!--
 * @Author: your name
 * @Date: 2020-07-07 22:02:56
 * @lastTime: 2020-07-15 11:51:33
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\view\Login.vue
--> 
<template>
  <div>
    <h2>
      登录loginPage
    </h2>
    <button v-reload>
      刷新
    </button>
    <TestTable>
      <!-- 测试 查询栏 按钮 插槽 -->
      <template v-slot:toolbarButtons="{currentRow}">
        <div>{{ currentRow }}</div>
      </template>
      <!-- 测试表格列 字段 插槽 -->
      <template v-slot:age>
        <span>111</span>
      </template>
    </TestTable>
    <!-- 模态窗 -->
    <Modal>
      <div>测试模态窗</div>
    </Modal>
  </div>
</template>
<script>
import TestTable from '@/pligins/TestTable.vue';
import Modal from '@/pligins/modal/Modal.vue';
export default {
  name: 'Login',
  components: {
    TestTable,
    Modal
  }
};
</script>