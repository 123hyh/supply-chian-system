<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:50:04
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 16:18:05
 * @message: 
 * @FilePath: \supply-chain-cli\src\components\Home\Content.vue
-->
<template>
  <main>
    <slot></slot>
  </main>
</template>
<script>
export default {
  name:'content-component'
};
</script>
<style lang="scss">
.block-content{
  background: #f0f0f0;
}
</style>
