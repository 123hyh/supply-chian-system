<!--
 * @Author: your name
 * @Date: 2020-07-07 20:24:47
 * @lastTime: 2020-07-29 10:42:58
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\view\Home\HomeContainer.vue
-->
<template>
  <div class="block-home">
    <Menu class="block-menu"/>
    <div
      class="block-content-box"
      :style="{width: closeMenu ? 'calc(100% - 70px)' : 'calc(100% - 201px)'}"
      >
      <HeaderCom class="block-header"/>
      <Content class="block-content">
        <Nav/>
        <router-view class="main-block"/>
      </Content>
    </div>
  </div>
</template>
<script>
import Content from '@/components/Home/Content.vue';
import Menu from '@/components/Home/Menu.vue';
import Header from '@/components/Home/Header.vue';
import Nav from '@/components/Home/Nav.vue';
import { mapGetters, mapState } from 'vuex';

export default {

  name: 'Home',
  components: {
    Content,
    Menu,
    HeaderCom: Header,
    Nav
  },
  computed:{
    ...mapState( 'opration', [ 'closeMenu' ] )
  }
};
</script>
<style lang="scss">
$header_height: 60px;

.block-home {
  width: 100%;
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
      overflow: auto;
      flex-grow: 1;
      height: calc(100vh - #{$header_height} );
    }
  }
  .main-block{
    height: calc(100% - 51px);
    box-sizing: border-box;
  }
}
</style>
