<!--
 * @Author: huangyuhui
 * @since: 2020-07-24 11:25:49
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-29 10:57:03
 * @message: 
 * @FilePath: \supply-chain-system\src\view\Test\index.vue
-->
<template>
  <div class="test-box">
    <button @click="handler">
      click
    </button>
    <slot/>
  </div>
</template>

<script>
export default {
  mounted () {
    debugger;
    console.log( '加载了' );
  },
  methods:{
    handler () {
      this.$emit( 'testlisteners' );
    }
  }
};
</script>

<style lang='scss'>
.test-box{
  width: 100%;
  height: 700px;
}
</style>
