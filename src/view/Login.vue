<!--
 * @Author: your name
 * @Date: 2020-07-07 22:02:56
 * @lastTime: 2020-07-08 10:41:18
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-cli\src\view\Login.vue
--> 
<template>
  <div>
    <h2>
      登录loginPage
    </h2>
    <TestTable />
  </div>
</template>
<script>
import TestTable from '@/pligins/TestTable.vue';
export default {
  components:{
    TestTable
  },
  name: 'login'
};
</script>