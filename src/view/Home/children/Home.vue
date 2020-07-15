<!--
 * @Author: huangyuhui
 * @since: 2020-07-14 09:45:08
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-14 11:21:30
 * @message: 
 * @FilePath: \supply-chain-system\src\view\Home\children\Home.vue
--> 
<template>
  <div>
    <p>home page</p>
    <button @click="handlerRefresh">
      测试刷新当前路由
    </button>
  </div>
</template>
<script>
export default {
  methods:{
    handlerRefresh () {
      this.reload();
    }
  }
};
</script>