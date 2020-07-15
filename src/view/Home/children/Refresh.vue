<!--
 * @Author: huangyuhui
 * @since: 2020-07-14 09:37:41
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-14 10:16:41
 * @message: 刷新当前路由
 * @FilePath: \supply-chain-system\src\view\Home\children\Refresh.vue
--> 
<template>
  <div class="block-refresh"/>
</template>
<script>
export default {
  beforeRouteEnter ( to, from, next ) {
    next( vm => {
      vm.$router.replace( from.fullPath );
    } );
  }
};
</script>
<style lang="scss" >
.block-refresh{
  height: 100%;
  width: 100%;
}
</style>