<!--
 * @Author: your name
 * @Date: 2020-07-07 22:02:56
 * @lastTime: 2020-07-24 08:51:16
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\view\Login.vue
--> 
<template>
  <div
    v-loading="visibled"
    class="login-block"
    >
    <h2>
      登录loginPage
    </h2>
    
    <TestTable v-if="false">
      <!-- 测试 查询栏 按钮 插槽 -->
      <template v-slot:toolbarButtons="{currentRow}">
        <div>当前点击行数据：{{ currentRow }}</div>
      </template>
      <!-- 测试表格列 字段 插槽 -->
      <template v-slot:age>
        <span>测试slot 插槽</span>
      </template>
    </TestTable>
    <!-- 模态窗 -->
    <Modal>
      <div>测试模态窗</div>
    </Modal>
    <TestTableTwo/>
  </div>
</template>
<script>
import TestTable from '@/plugins/TestTable.vue';
import Modal from '@/plugins/modal/Modal.vue';
import loading from '../plugins/loadding';
export default {
  name: 'Login',
  components: {
    TestTable,
    Modal,
    TestTableTwo: () => import( '@/plugins/TableJsx/spec.vue' )
  },
  data () {
    return {
      visibled: false,
      cname: 'TestTableTwo'
    };
  },
  mounted () {
    setTimeout( () => {
      this.visibled = true;
      setTimeout( () => {
        this.visibled = false;
      }, 1000 );
    }, 2000 );
  }
};
</script>
<style lang="scss">
.login-block{
  width: 100%;
  height: 100%;
}
</style>