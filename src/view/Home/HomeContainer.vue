<!--
 * @Author: your name
 * @Date: 2020-07-07 20:24:47
 * @lastTime: 2020-07-14 09:46:23
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\view\Home\HomeContainer.vue
-->
<template>
  <div class="block-home">
    <Menu class="block-menu"/>
    <div class="block-content-box">
      <HeaderCom class="block-header"/>
      <Content class="block-content">
        <router-view/>
      </Content>
    </div>
  </div>
</template>
<script>
import Content from '@/components/Home/Content.vue';
import Menu from '@/components/Home/Menu.vue';
import Header from '@/components/Home/Header.vue';
export default {
  name: 'Home',
  components: {
    Content,
    Menu,
    HeaderCom: Header
  }
};
</script>
<style lang="scss">
$header_height: 50px;

.block-home {
  display: flex;
  flex-wrap: wrap;

  .block-menu {
    all: unset;
    height: 100vh;
    overflow-y: auto;
  }
  .block-content-box {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    .block-header {
      flex-basis: 100%;
      height: $header_height;
    }
    .block-content {
      flex-grow: 1;
      height: calc(100vh - #{$header_height});
    }
  }
}
</style>
