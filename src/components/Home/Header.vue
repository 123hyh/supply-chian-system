<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:48:47
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 16:58:01
 * @message: 
 * @FilePath: \supply-chain-cli\src\components\Home\Header.vue
-->
<template>
  <header>
    <!-- 左边菜单操作按钮 -->
    <div class="menu-opration">
      <i
        @click.stop="() => SET_MENU_STATUS()"
        :class="classList"
        style="font-size: 25px"
      ></i>
    </div>
    <!-- nav  -->
    <div></div>
    <!-- 用户操作区域 -->
    <div class="block-opration">
      <div>
        <i
          @click.stop="handlerFullscreen"
          class="el-icon-full-screen"
          style="font-size: 25px"
        ></i>
      </div>
    </div>
  </header>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'header-component',
  computed: {
    ...mapState( 'opration', [ 'closeMenu' ] ),
    classList() {
      return {
        'el-icon-s-unfold': this.closeMenu,
        'el-icon-s-fold': !this.closeMenu
      };
    }
  },
  methods: {
    ...mapMutations( 'opration', [ 'SET_MENU_STATUS' ] ),
    /**
     * 点击全屏事件
     * @description:
     * @param {type}
     * @return:
     */

    handlerFullscreen() {
      if ( document.fullscreen ) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  }
};
</script>
<style lang="scss">
.block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .menu-opration {
    i {
      cursor: pointer;
    }
  }
  .block-opration {
    .el-icon-full-screen {
      cursor: pointer;
    }
  }
}
</style>
