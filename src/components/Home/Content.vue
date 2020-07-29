<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:50:04
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-29 14:36:55
 * @message: 
 * @FilePath: \supply-chain-system\src\components\Home\Content.vue
-->
<template>
  <main>
    <slot/>
  </main>
</template>
<script>
export default {
  name:'ContentComponent',
  watch:{
    '$route' :{
      handler ( to, from ) {
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss">
.block-content{
  background: #f9f9f9;
}
</style>
