<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:50:04
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-17 09:08:44
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
  name:'ContentComponent'
};
</script>
<style lang="scss">
.block-content{
  background: #f0f0f0;
}
</style>
